import React, { useEffect, useState } from "react";
import { getAllRequests, confirmRequest } from "../../../services/api/requestApi";
import { Button } from "../../../components/ui/button";
import {
  CheckCircle,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Ban,
  ArrowUpDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const ITEMS_PER_PAGE = 5;

const BloodRequestTable = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRequests();
      const data = response.data || [];
      console.log("Fetched requests:", data);
      setBloodRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchTerm, filterBloodType, filterStatus, filterUrgency, bloodRequests, sortField, sortDirection]);

  const applyFiltersAndSort = () => {
    let filtered = [...bloodRequests];

    console.log("Applying filters with:", {
      searchTerm,
      filterBloodType,
      filterStatus,
      filterUrgency,
    });

    // Filtre de recherche (nom ou téléphone)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (req) =>
          (req.userName &&
            req.userName.toLowerCase().includes(searchLower)) ||
          (req.userPhone && req.userPhone.includes(searchLower))
      );
    }

    // Filtre par groupe sanguin
    if (filterBloodType) {
      filtered = filtered.filter(
        (req) => req.bloodType && req.bloodType === filterBloodType
      );
    }

    // Filtre par statut
    if (filterStatus) {
      filtered = filtered.filter(
        (req) =>
          req.status &&
          req.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Filtre par niveau d'urgence
    if (filterUrgency) {
      filtered = filtered.filter(
        (req) => req.urgencyLevel && req.urgencyLevel === filterUrgency
      );
    }

    // Tri
    filtered.sort((a, b) => {
      let valueA, valueB;
      if (sortField === "createdAt") {
        valueA = new Date(a.createdAt);
        valueB = new Date(b.createdAt);
      } else if (sortField === "urgencyLevel") {
        valueA = a.urgencyLevel || "";
        valueB = b.urgencyLevel || "";
      } else {
        valueA = a[sortField] || "";
        valueB = b[sortField] || "";
      }

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    console.log("Filtered and sorted requests:", filtered);
    setFilteredRequests(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterBloodType("");
    setFilterStatus("");
    setFilterUrgency("");
    setSortField("createdAt");
    setSortDirection("desc");
    setFilteredRequests(bloodRequests);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleConfirm = async (id) => {
    try {
      await confirmRequest(id);
      await fetchRequests();
    } catch (error) {
      console.error("Erreur lors de la confirmation :", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Assuming rejectRequest API exists
      await fetch("http://localhost:8080/api/requests/reject/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      await fetchRequests();
    } catch (error) {
      console.error("Erreur lors du rejet :", error);
    }
  };

  const openDialog = (action, id) => {
    setDialogAction(action);
    setSelectedRequestId(id);
    setDialogOpen(true);
  };

  const handleDialogConfirm = async () => {
    if (dialogAction === "confirm") {
      await handleConfirm(selectedRequestId);
    } else if (dialogAction === "reject") {
      await handleReject(selectedRequestId);
    }
    setDialogOpen(false);
    setDialogAction(null);
    setSelectedRequestId(null);
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nom",
      "Téléphone",
      "Groupe Sanguin",
      "Unités",
      "Urgence",
      "Date",
      "Statut",
    ];

    const data = filteredRequests.map((req) => [
      req.id || "",
      req.userName || "",
      req.userPhone || "",
      req.bloodType || "",
      req.requiredBloodUnits || "",
      req.urgencyLevel || "",
      req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "",
      req.status || (req.confirmedByCenterManager ? "CONFIRMED" : "PENDING"),
    ]);

    const csvContent = [headers, ...data].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `demandes-sang-${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const uniqueBloodTypes = [
    ...new Set(bloodRequests.map((req) => req.bloodType).filter(Boolean)),
  ];

  const uniqueUrgencyLevels = [
    ...new Set(bloodRequests.map((req) => req.urgencyLevel).filter(Boolean)),
  ];

  return (
    <Card className="w-full shadow-lg border border-gray-100">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
        <CardTitle className="text-2xl font-bold text-red-600">
          Gestion des Demandes de Sang
        </CardTitle>
        <CardDescription className="text-gray-600">
          Visualisez, filtrez et gérez les demandes de dons de sang
        </CardDescription>

        {/* Barre d'outils avec recherche, filtres et export */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher par nom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-300 focus:ring-red-300 focus:border-red-300 transition-all"
            />
          </div>

          <div className="flex flex-1 gap-2">
            <select
              value={filterBloodType}
              onChange={(e) => setFilterBloodType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300 transition-all text-gray-700"
            >
              <option value="">Tous les groupes sanguins</option>
              {uniqueBloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300 transition-all text-gray-700"
            >
              <option value="">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmée</option>
              <option value="REJECTED">Rejetée</option>
            </select>

            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300 transition-all text-gray-700"
            >
              <option value="">Toutes les urgences</option>
              {uniqueUrgencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 transition-all"
              onClick={exportToCSV}
            >
              <Download className="h-4 w-4" />
              Exporter en CSV
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 transition-all"
              onClick={resetFilters}
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-medium">
            Aucune demande de sang trouvée
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-red-50 hover:bg-red-100 transition-all">
                    <TableHead className="font-semibold text-gray-700">ID</TableHead>
                    <TableHead className="font-semibold text-gray-700">Nom</TableHead>
                    <TableHead className="font-semibold text-gray-700">Téléphone</TableHead>
                    <TableHead className="font-semibold text-gray-700">Groupe</TableHead>
                    <TableHead className="font-semibold text-gray-700">Unités</TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => handleSort("urgencyLevel")}
                      >
                        Urgence
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => handleSort("createdAt")}
                      >
                        Date
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">Statut</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRequests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-gray-50 transition-all">
                      <TableCell className="text-gray-800">{req.id}</TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {req.userName}
                      </TableCell>
                      <TableCell className="text-gray-800">{req.userPhone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {req.bloodType}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-800">{req.requiredBloodUnits}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            req.urgencyLevel === "URGENT"
                              ? "bg-red-100 text-red-800"
                              : req.urgencyLevel === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {req.urgencyLevel}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {new Date(req.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            req.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : req.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {req.status === "CONFIRMED"
                            ? "Confirmée"
                            : req.status === "REJECTED"
                            ? "Rejetée"
                            : "En attente"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {(req.status === "PENDING" || !req.status) && (
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-800 hover:bg-green-50 transition-all"
                                    onClick={() => openDialog("confirm", req.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Confirmer
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Confirmer cette demande
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 transition-all"
                                    onClick={() => openDialog("reject", req.id)}
                                  >
                                    <Ban className="h-4 w-4 mr-1" />
                                    Rejeter
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Rejeter cette demande
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-gray-600 font-medium">
                Affichage {startIndex + 1} à{" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredRequests.length)}{" "}
                sur {filteredRequests.length} demandes
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm text-gray-700 font-medium">
                  Page {currentPage} sur {totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-9 w-9 p-0 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "confirm"
                ? "Confirmer la demande"
                : "Rejeter la demande"}
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir{" "}
              {dialogAction === "confirm" ? "confirmer" : "rejeter"} cette demande de
              sang ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Annuler
            </Button>
            <Button
              variant={dialogAction === "confirm" ? "default" : "destructive"}
              onClick={handleDialogConfirm}
              className={
                dialogAction === "confirm"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {dialogAction === "confirm" ? "Confirmer" : "Rejeter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BloodRequestTable;