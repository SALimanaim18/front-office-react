import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Droplet, 
  Users, 
  Calendar, 
  BarChart, 
  Hospital,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/Index', active: true },
    { label: 'Blood Requests', icon: Droplet, href: '/admin/BloodRequests' },
    
    { label: 'Appointments', icon: Calendar, href: '/admin/AppointmentPage' },
  ];

  return (
    <aside 
      className={cn(
        "bg-[#dc2626] text-white transition-all duration-300 flex flex-col h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-primary-light">
        {!collapsed && (
          <div className="text-lg font-bold mr-2">SangConnect</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-md hover:bg-[#dc2626]-light transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm transition-colors hover:bg-primary-light",
                  item.active && "bg-primary-light",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-light mt-auto">
        {!collapsed && (
          <div className="text-xs opacity-70">
            Blood Donation Management v1.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
