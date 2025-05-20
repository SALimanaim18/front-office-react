import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout ';
import StatCard from '../components/dashboard/StatCard';
import BloodTypeChart from '../components/dashboard/BloodTypeChart';
import { Card } from '../../components/ui/card';
import { 
  Droplet, 
  AlertTriangle, 
  CheckCircle, 
  HeartPulse, 
  RefreshCw,
  BarChart3,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { getRequestsCountByCenter, getUrgentRequestsCountByCenter } from '../../services/api/requestApi';
import { getUserProfile } from '../../services/api/userApi';
import LatestRequestTable from '../components/dashboard/LatestRequestTable';
import RecentActivity from './RecentActivity';

const Index = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    urgentCases: 0,
    validatedDonations: 0,
    activeDonors: 0,
  });

  const [trends, setTrends] = useState({
    totalRequests: { value: '+0%', positive: true },
    urgentCases: { value: '-0%', positive: false },
    validatedDonations: { value: '+0%', positive: true },
    activeDonors: { value: '+0%', positive: true },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const profile = await getUserProfile();
      const centerId = profile?.donationCenter?.id;

      if (!centerId) {
        throw new Error("No donation center ID found in user profile");
      }

      const total = await getRequestsCountByCenter(centerId);
      const urgent = await getUrgentRequestsCountByCenter(centerId);
      const validated = 12; // Placeholder
      const donors = 48;    // Placeholder

      setStats({
        totalRequests: total,
        urgentCases: urgent,
        validatedDonations: validated,
        activeDonors: donors,
      });

      setTrends({
        totalRequests: { value: '+12%', positive: true },
        urgentCases: { value: '-3%', positive: false },
        validatedDonations: { value: '+8%', positive: true },
        activeDonors: { value: '+2%', positive: true },
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error loading statistics:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blood Donation Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Overview of donation requests and center activities
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {lastUpdated && (
              <p className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Blood Requests" 
            value={stats.totalRequests} 
            trend={trends.totalRequests}
            icon={<Droplet className="h-6 w-6 text-blue-600" />} 
            className="animate-fade-in shadow-sm" 
            loading={loading}
          />
          <StatCard 
            title="Urgent Cases" 
            value={stats.urgentCases} 
            trend={trends.urgentCases}
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />} 
            className="animate-fade-in shadow-sm [animation-delay:100ms]" 
            loading={loading}
          />
          <StatCard 
            title="Validated Donations" 
            value={stats.validatedDonations} 
            trend={trends.validatedDonations}
            icon={<CheckCircle className="h-6 w-6 text-green-600" />} 
            className="animate-fade-in shadow-sm [animation-delay:200ms]" 
            loading={loading}
          />
          <StatCard 
            title="Active Donors" 
            value={stats.activeDonors} 
            trend={trends.activeDonors}
            icon={<HeartPulse className="h-6 w-6 text-rose-500" />} 
            className="animate-fade-in shadow-sm [animation-delay:300ms]" 
            loading={loading}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer p-4 flex items-center shadow-sm">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Schedule Collection</h3>
              <p className="text-sm text-gray-500">Organize new donation event</p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors cursor-pointer p-4 flex items-center shadow-sm">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">View Reports</h3>
              <p className="text-sm text-gray-500">Monthly donation statistics</p>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors cursor-pointer p-4 flex items-center shadow-sm">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <HelpCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Help Center</h3>
              <p className="text-sm text-gray-500">Get support and resources</p>
            </div>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Latest Blood Requests</h2>
                <p className="text-sm text-gray-500">Recent donation requests at your center</p>
              </div>
              <div className="p-1">
                <LatestRequestTable />
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-sm h-full">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Blood Type Distribution</h2>
                <p className="text-sm text-gray-500">Current inventory status</p>
              </div>
              <div className="p-4">
                <BloodTypeChart />
              </div>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default Index;