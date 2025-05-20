import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile, changePassword, getUserRequests, uploadUserPhoto, getAllCities } from '../services/api/userApi';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Badge } from '../components/ui/badge';
import { AlertCircle, Check, User, Lock, FileText, Camera, Edit } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/images/default-avatar.png';

const colors = {
  primary: '#b2d3e1',
  primaryDark: '#8fb9cc',
  accent: '#e74c3c',
  light: '#f8f9fa',
  dark: '#2d3748',
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [cities, setCities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [photo, setPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setFormData(userData);

        const cityData = await getAllCities();
        console.log('Villes reçues:', cityData); // Debug log
        setCities(Array.isArray(cityData) ? cityData : []);

        const requestData = await getUserRequests();
        console.log('Demandes reçues:', requestData); // Debug log
        setRequests(Array.isArray(requestData) ? requestData : []);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger vos données. Veuillez réessayer plus tard.");
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(formData);
      setEditMode(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordError('');
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setPasswordError("Erreur lors du changement de mot de passe");
      console.error("Erreur lors du changement de mot de passe:", error);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadUserPhoto(file);
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } catch (error) {
        console.error("Erreur lors du téléchargement de la photo:", error);
        setError("Erreur lors du téléchargement de la photo.");
      }
    }
  };

  const getUrgencyBadgeColor = (level) => {
    switch (level) {
      case 'CRITIQUE':
        return 'bg-red-500';
      case 'HAUTE':
        return 'bg-orange-500';
      case 'MOYENNE':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : 'Ville inconnue';
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 pb-16">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mon Espace Personnel</h1>
          <p className="text-gray-600">Gérez vos informations et suivez vos demandes de don</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-md flex items-center text-red-700">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {updateSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-md flex items-center text-green-700">
            <Check size={20} className="mr-2" />
            <span>Mise à jour effectuée avec succès !</span>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8" style={{ backgroundColor: colors.light }}>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:border-b-2"
              style={{ borderColor: activeTab === 'profile' ? colors.accent : 'transparent' }}
            >
              <User size={18} className="mr-2" />
              Mon Profil
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:border-b-2"
              style={{ borderColor: activeTab === 'security' ? colors.accent : 'transparent' }}
            >
              <Lock size={18} className="mr-2" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:border-b-2"
              style={{ borderColor: activeTab === 'requests' ? colors.accent : 'transparent' }}
            >
              <FileText size={18} className="mr-2" />
              Mes Demandes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-8 shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderTop: `4px solid ${colors.accent}` }}>
              <div className="flex flex-col md:flex-row md:space-x-8 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4" style={{ borderColor: colors.primary }}>
                      <img
                        src={user?.photoUrl && user.photoUrl.trim() !== '' ? `http://localhost:8080${user.photoUrl}` : defaultAvatar}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = defaultAvatar;
                        }}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label htmlFor="photo-upload" className="absolute bottom-2 right-2 p-2 rounded-full cursor-pointer" style={{ backgroundColor: colors.primary }}>
                      <Camera size={18} color="white" />
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-gray-600">Donateur depuis {formatDate(user?.createdAt)}</p>
                </div>

                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Informations Personnelles</h2>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center"
                      style={{ borderColor: colors.accent, color: colors.accent }}
                    >
                      <Edit size={16} className="mr-2" />
                      {editMode ? 'Annuler' : 'Modifier'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-700 mb-1 block">Prénom</Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                        style={{ borderColor: editMode ? colors.primary : null }}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-1 block">Nom</Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                        style={{ borderColor: editMode ? colors.primary : null }}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-1 block">Email</Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                        style={{ borderColor: editMode ? colors.primary : null }}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 mb-1 block">Téléphone</Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                        style={{ borderColor: editMode ? colors.primary : null }}
                      />
                    </div>
                  </div>

                  {editMode && (
                    <div className="mt-6">
                      <Button
                        onClick={handleProfileUpdate}
                        className="px-6"
                        style={{ backgroundColor: colors.accent, color: 'white' }}
                      >
                        Sauvegarder les modifications
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-8 shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderTop: `4px solid ${colors.accent}` }}>
              <h2 className="text-xl font-semibold mb-6">Changer le mot de passe</h2>

              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                  <AlertCircle size={20} className="mr-2" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 mb-1 block">Ancien mot de passe</Label>
                  <Input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                    style={{ borderColor: colors.primary }}
                  />
                </div>
                <div className="md:col-span-2"></div>
                <div>
                  <Label className="text-gray-700 mb-1 block">Nouveau mot de passe</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                    style={{ borderColor: colors.primary }}
                  />
                </div>
                <div>
                  <Label className="text-gray-700 mb-1 block">Confirmer le nouveau mot de passe</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                    style={{ borderColor: colors.primary }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handlePasswordUpdate}
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                >
                  Mettre à jour le mot de passe
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="p-8 shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderTop: `4px solid ${colors.accent}` }}>
              <h2 className="text-xl font-semibold mb-6">Mes demandes de sang</h2>

              {!Array.isArray(requests) || requests.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                    <FileText size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600">Vous n'avez pas encore effectué de demande de sang.</p>
                  <Link
                    to="/FormulaireDemandeSang"
                    className="mt-4 inline-block px-4 py-2 rounded-md"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                  >
                    Créer une demande
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 border rounded-md hover:shadow-md transition-shadow duration-200 flex flex-col"
                      style={{ borderLeft: `4px solid ${colors.primary}` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">Groupe {req.bloodType}</h3>
                          <p className="text-gray-600">{getCityName(req.cityId)}</p>
                        </div>
                        <Badge className={`${getUrgencyBadgeColor(req.urgencyLevel)} text-white`}>
                          {req.urgencyLevel === 'CRITIQUE' ? 'Urgence' : req.urgencyLevel}
                        </Badge>
                      </div>
                      <div className="mt-auto pt-3 flex justify-between items-center text-sm text-gray-500 border-t">
                        <span>{formatDate(req.createdAt)}</span>
                        <span>{req.confirmedByCenterManager ? 'Confirmé' : 'En cours'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}