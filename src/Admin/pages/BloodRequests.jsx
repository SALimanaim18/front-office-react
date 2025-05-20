import React from "react";
import BloodRequestTable from "../components/dashboard/BloodRequestTable";

const BloodRequests = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Demandes de sang</h1>
          <p className="text-gray-500">Gérez les demandes en attente, urgentes ou confirmées.</p>
        </div>

        {/* Filtres de recherche */}
        <div className="mb-4">
         
        </div>

        {/* Tableau des demandes */}
        <BloodRequestTable />
      </div>
    </>
  );
};

export default BloodRequests;
