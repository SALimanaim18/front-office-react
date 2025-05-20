import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import TopNavbar from './TopNavbar';


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
