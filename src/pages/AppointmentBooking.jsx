import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';
import { getAppointmentsByDate, createAppointment } from '../services/api/appointmentApi';
import { createDonation } from '../services/api/donationApi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import logoImg from '../assets/images/logo.png';

export default function AppointmentBooking() {
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("centerId");
  const requestId = searchParams.get("requestId");
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState({});
  const [unavailableTimes, setUnavailableTimes] = useState({});
  const [dayBookingStatus, setDayBookingStatus] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingMonthData, setIsLoadingMonthData] = useState(false);
  const [error, setError] = useState(null);
  const [centerInfo, setCenterInfo] = useState(null);
  const [userData, setUserData] = useState(null);

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!centerId || !requestId || !userId || !authToken) {
      setError("Accès non autorisé : paramètres ou authentification manquante.");
      navigate("/login");
      return;
    }

    if (userRole !== "USER") {
      setError("Accès refusé : seuls les utilisateurs avec le rôle USER peuvent prendre des rendez-vous.");
      navigate("/");
      return;
    }

    const fetchCenterInfo = async () => {
      try {
        const res = await fetch(`/api/centers/${centerId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération du centre.");
        const data = await res.json();
        setCenterInfo(data);
      } catch (err) {
        setError(err.message);
        console.error("Erreur centre:", err);
      }
    };

    fetchCenterInfo();
    fetchUserData();
  }, [centerId, requestId, userId, authToken, userRole, navigate]);

  const fetchUserData = async () => {
    if (!userId || !authToken) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des données utilisateur.");
      const data = await res.json();
      setUserData(data);

      const fullName = data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || `Utilisateur #${userId}`;
      localStorage.setItem("userName", fullName);
      if (data.bloodType) localStorage.setItem("bloodType", data.bloodType);
    } catch (err) {
      setError("Erreur lors de la récupération des données utilisateur.");
      console.error("Erreur utilisateur:", err);
    }
  };

  useEffect(() => {
    const fetchMonthAvailability = async () => {
      if (!centerId || !authToken) return;

      setIsLoadingMonthData(true);
      setError(null);

      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const lastDay = new Date(year, month + 1, 0).getDate();
      const newUnavailableDates = {};
      const newUnavailableTimes = {};
      const newDayBookingStatus = {};

      const promises = [];
      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        if (date < new Date().setHours(0, 0, 0, 0)) continue;

        const dateStr = date.toISOString().split("T")[0];
        promises.push(
          getAppointmentsByDate(centerId, dateStr)
            .then((res) => ({ date, dateStr, data: res.data }))
            .catch((err) => ({ date, dateStr, error: err }))
        );
      }

      const results = await Promise.all(promises);
      let hasError = false;

      results.forEach(({ date, dateStr, data, error }) => {
        const dateKey = date.toDateString();
        if (error) {
          console.error(`Erreur indisponibilités ${dateStr}:`, error);
          hasError = true;
          return;
        }

        const unavailableForDate = {};
        data.forEach((appt) => {
          const time = new Date(appt.appointmentDateTime).toTimeString().slice(0, 5);
          unavailableForDate[time] = true;
        });

        newUnavailableTimes[dateKey] = unavailableForDate;
        const bookedCount = Object.keys(unavailableForDate).length;
        newDayBookingStatus[dateKey] = {
          total: timeSlots.length,
          booked: bookedCount,
          available: timeSlots.length - bookedCount,
        };

        if (bookedCount === timeSlots.length) {
          newUnavailableDates[dateKey] = true;
        }
      });

      setUnavailableDates(newUnavailableDates);
      setUnavailableTimes(newUnavailableTimes);
      setDayBookingStatus(newDayBookingStatus);
      setIsLoadingMonthData(false);
      if (hasError) {
        setError("Certaines données de disponibilité n'ont pas pu être chargées.");
      }
    };

    fetchMonthAvailability();
  }, [centerId, authToken, currentMonth]);

  const formatDate = (date) => date?.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || '';

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek < 0) firstDayOfWeek = 6;

    const days = [];
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, month: month - 1, year, currentMonth: false });
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = date.toDateString();
      const status = dayBookingStatus[dateKey] || { total: timeSlots.length, booked: 0, available: timeSlots.length };

      days.push({
        day: i,
        month,
        year,
        currentMonth: true,
        isToday: i === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
        isPast: date < new Date().setHours(0, 0, 0, 0),
        isFullyBooked: unavailableDates[dateKey],
        date,
        bookingStatus: status,
      });
    }

    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, month: month + 1, year, currentMonth: false });
    }

    return days;
  };

  const prevMonth = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day) => {
    if (!day.currentMonth || day.isPast || day.isFullyBooked) return;
    setSelectedDate(day.date);
    setSelectedTime(null);
  };

  const isTimeAvailable = (time) => {
    if (!selectedDate) return false;
    const dateKey = selectedDate.toDateString();
    return !unavailableTimes[dateKey]?.[time];
  };

  const handleTimeSelect = (time) => {
    if (!isTimeAvailable(time)) return;
    setSelectedTime(time);
  };

  const getUserBloodType = () => {
    return userData?.bloodType || localStorage.getItem("bloodType") || "Non spécifié";
  };

  const generateProfessionalPDF = (appointmentData) => {
    const donorFullName = userData?.fullName || localStorage.getItem("userName") || `Utilisateur #${userId}`;
    const bloodType = getUserBloodType();
    const doc = new jsPDF();

    const primaryColor = [178, 34, 34];
    const secondaryColor = [235, 235, 235];

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Confirmation de rendez-vous", 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text("Don de sang SangConnect", 105, 30, { align: 'center' });

    doc.setFillColor(245, 245, 245);
    doc.rect(10, 50, 190, 40, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Centre de don du sang", 15, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(centerInfo?.name || `Centre #${centerId}`, 15, 68);
    doc.text(centerInfo?.address || 'Adresse non disponible', 15, 76);
    doc.text(`${centerInfo?.city || ''}, ${centerInfo?.postalCode || ''}`, 15, 84);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Détails du rendez-vous", 105, 105, { align: 'center' });
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(15, 110, 195, 110);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Date:", 15, 125);
    doc.text("Heure:", 15, 135);
    doc.text("Donneur:", 15, 145);
    doc.text("Groupe sanguin:", 15, 155);
    doc.text("ID de rendez-vous:", 15, 165);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(appointmentData.date), 70, 125);
    doc.text(`${appointmentData.time}:00`, 70, 135);
    doc.text(donorFullName, 70, 145);
    doc.text(bloodType, 70, 155);
    doc.text(`#${appointmentData.id}`, 70, 165);

    doc.setFillColor(245, 245, 245);
    doc.rect(10, 180, 190, 50, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Instructions importantes", 15, 190);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("• Veuillez vous présenter 15 minutes avant votre rendez-vous", 15, 200);
    doc.text("• Apportez une pièce d'identité valide", 15, 207);
    doc.text("• Assurez-vous d'être bien hydraté et d'avoir mangé avant votre don", 15, 214);
    doc.text("• Prévoyez environ 45 minutes pour l'ensemble du processus de don", 15, 221);

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(10, 240, 200, 240);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Généré par SangConnect - Plateforme de gestion des dons de sang", 105, 247, { align: 'center' });
    doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 105, 252, { align: 'center' });

    doc.setFillColor(0, 0, 0);
    doc.roundedRect(155, 120, 40, 40, 2, 2, 'FD');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("QR Code", 175, 145, { align: 'center' });

    const fileName = `confirmation_don_sang_${formatDate(appointmentData.date).replace(/ /g, '_')}.pdf`;
    doc.save(fileName);
  };

  const confirmAppointment = async () => {
    if (!selectedDate || !selectedTime || !userId || !authToken) {
      setError("Veuillez sélectionner une date, une heure, et être connecté.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const latestCheck = await getAppointmentsByDate(centerId, formattedDate);
      const isTimeNowTaken = latestCheck.data.some(appt => {
        const time = new Date(appt.appointmentDateTime).toTimeString().slice(0, 5);
        return time === selectedTime;
      });

      if (isTimeNowTaken) {
        throw new Error("Ce créneau vient d'être réservé par quelqu'un d'autre.");
      }

      const donorFullName = userData?.fullName || localStorage.getItem("userName") || `Utilisateur #${userId}`;
      const appointmentData = {
        userId: Number(userId),
        requestId: Number(requestId),
        centerId: Number(centerId),
        date: formattedDate,
        time: selectedTime,
        confirmed: true,
        userName: donorFullName,
      };

      const appointmentRes = await createAppointment(appointmentData);
      const bloodType = getUserBloodType();
      const donationPayload = {
        userId: Number(userId),
        requestId: Number(requestId),
        centerId: Number(centerId),
        appointmentId: appointmentRes.data.id,
        donationDate: `${formattedDate}T${selectedTime}:00`,
        bloodType: bloodType === "Non spécifié" ? "O+" : bloodType,
        volumeMl: 450,
        validated: false,
      };

      await createDonation(donationPayload);
      generateProfessionalPDF({
        id: appointmentRes.data.id,
        date: selectedDate,
        time: selectedTime,
        center: centerInfo || { name: `Centre #${centerId}` },
      });

      setIsProcessing(false);
      navigate("/confirmation", { state: { appointmentId: appointmentRes.data.id } });
    } catch (err) {
      setIsProcessing(false);
      const errorMessage =
        err.response?.status === 401 ? "Session expirée. Veuillez vous reconnecter." :
        err.response?.status === 403 ? "Accès refusé : vous n'êtes pas autorisé à créer un rendez-vous." :
        err.response?.status === 400 ? `Erreur de validation : ${err.response.data || err.message}` :
        err.response?.data || err.message || "Erreur lors de la création du rendez-vous.";
      setError(errorMessage);
      console.error("Erreur rendez-vous:", err.response?.data || err);
    }
  };

  const getBookingStatusForSelectedDate = () => {
    if (!selectedDate) return null;
    const dateKey = selectedDate.toDateString();
    return dayBookingStatus[dateKey] || { total: timeSlots.length, booked: 0, available: timeSlots.length };
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-50 p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-red-900">Prise de rendez-vous</h1>
            <p className="text-red-800 mt-1">Choisissez une date et un horaire disponible</p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={isLoadingMonthData}
              >
                ◀
              </button>
              <h2 className="text-xl font-semibold text-red-900">
                <Calendar className="inline mr-2" size={20} />
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                {isLoadingMonthData && (
                  <span className="text-sm text-gray-500 ml-2 animate-pulse">Chargement...</span>
                )}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={isLoadingMonthData}
              >
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-4">
              {weekdays.map((day, i) => (
                <div key={i} className="font-medium">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {getDaysInMonth().map((day, i) => (
                <div
                  key={i}
                  onClick={() => handleDateSelect(day)}
                  className={`h-12 flex flex-col items-center justify-center rounded-lg text-sm relative
                    ${day.currentMonth
                      ? day.isPast || day.isFullyBooked
                        ? 'text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none'
                        : 'hover:bg-red-100 cursor-pointer'
                      : 'text-gray-300 pointer-events-none'}
                    ${selectedDate && day.date && selectedDate.toDateString() === day.date.toDateString() ? 'bg-red-900 text-white' : ''}`}
                >
                  <span className="font-medium">{day.day}</span>
                  {day.currentMonth && !day.isPast && day.bookingStatus && (
                    <div
                      className={`text-xs mt-1 ${
                        selectedDate && day.date && selectedDate.toDateString() === day.date.toDateString()
                          ? 'text-white'
                          : 'text-gray-500'
                      }`}
                    >
                      {day.bookingStatus.booked > 0 && (
                        <span className="flex items-center justify-center">
                          <Clock size={8} className="mr-0.5" />
                          {day.bookingStatus.booked}/{day.bookingStatus.total}
                        </span>
                      )}
                    </div>
                  )}
                  {day.isFullyBooked && day.currentMonth && !day.isPast && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" title="Complet"></span>
                  )}
                </div>
              ))}
            </div>

            {selectedDate && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-800 font-medium">{formatDate(selectedDate)}</p>
                    {getBookingStatusForSelectedDate() && (
                      <div className="flex items-center bg-white px-3 py-1 rounded-full text-sm border border-gray-200">
                        <Clock size={16} className="mr-2 text-red-700" />
                        <span className="text-gray-800 font-medium">
                          {getBookingStatusForSelectedDate().booked} créneaux sur {getBookingStatusForSelectedDate().total} réservés
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {timeSlots.map((time) => {
                    const available = isTimeAvailable(time);
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={!available}
                        className={`
                          py-3 rounded-lg text-sm font-medium transition-all
                          ${available
                            ? selectedTime === time
                              ? 'bg-red-900 text-white shadow-md'
                              : 'bg-blue-50 text-red-900 hover:bg-blue-100 border border-blue-100 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed relative'}
                        `}
                      >
                        {time}
                        {selectedTime === time && available && <CheckCircle size={14} className="inline ml-1" />}
                        {!available && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">
                            Réservé
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={confirmAppointment}
                  disabled={!selectedTime || isProcessing || !isTimeAvailable(selectedTime)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center
                    ${selectedTime && !isProcessing && isTimeAvailable(selectedTime)
                      ? 'bg-red-900 text-white hover:bg-red-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {isProcessing ? (
                    'Traitement en cours...'
                  ) : (
                    <>
                      <FileText size={18} className="mr-2" />
                      Confirmer le rendez-vous et générer PDF
                    </>
                  )}
                </button>
              </>
            )}

            <div className="mt-6 text-sm text-gray-600 flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-1">Légende</h3>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                <span>Date passée</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-white border border-gray-300 mr-2 relative">
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
                <span>Tous les créneaux sont réservés</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-900 mr-2"></div>
                <span>Date sélectionnée</span>
              </div>
              <div className="flex items-center">
                  <Clock size={14} className="mr-2 text-gray-500" />
                <span>X/8 indique le nombre de créneaux réservés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}