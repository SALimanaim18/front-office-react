import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Droplet, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { getLatestRequestsByCenter } from '../../services/api/requestApi';
import { getUserProfile } from '../../services/api/userApi';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        setError(null);
        // Get the current user's profile to get the center ID
        const profile = await getUserProfile();
        const centerId = profile?.donationCenter?.id;
        
        if (!centerId) {
          throw new Error("No donation center ID found in user profile");
        }

        // Get latest requests from the API
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await getLatestRequestsByCenter(centerId, token);
        
        // Transform the data for display
        if (response && response.data) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
        setError("Failed to load recent activities");
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  // Get appropriate activity details based on the type
  const getActivityDetails = (activity) => {
    // Default values
    let title = "New blood donation request";
    let description = `Patient ID #${activity.patientId || 'Unknown'} requires ${activity.bloodType || 'Unknown'} blood at ${activity.hospital || activity.center?.name || 'Unknown Hospital'}`;
    let icon = <Droplet className="h-4 w-4 text-white" />;
    let bgColor = "bg-blue-500";
    
    // Customize based on activity type (assuming activities might have different types)
    switch(activity.type) {
      case 'urgent':
        title = "Urgent blood request";
        icon = <AlertTriangle className="h-4 w-4 text-white" />;
        bgColor = "bg-red-500";
        break;
      case 'donation':
        title = "New donation received";
        icon = <CheckCircle className="h-4 w-4 text-white" />;
        bgColor = "bg-green-500";
        description = `${activity.donorName || 'A donor'} donated ${activity.bloodType || 'blood'} at ${activity.center?.name || 'your center'}`;
        break;
      case 'event':
        title = "Donation event scheduled";
        icon = <Calendar className="h-4 w-4 text-white" />;
        bgColor = "bg-purple-500";
        description = `New donation event scheduled at ${activity.location || activity.center?.name || 'your center'}`;
        break;
      default:
        // Use default values
        break;
    }
    
    return {
      title,
      description,
      timeAgo: activity.createdAt ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }) : 'Recently',
      icon,
      bgColor
    };
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">Latest updates from your donation center</p>
        </div>
        {activities.length > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activities.length} New
          </span>
        )}
      </div>
      
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-gray-500">{error}</p>
            <button className="mt-3 text-sm text-blue-500 hover:text-blue-700">
              Try Again
            </button>
          </div>
        ) : activities.length > 0 ? (
          activities.map((activity, index) => {
            const details = getActivityDetails(activity);
            return (
              <div key={activity.id || index} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full ${details.bgColor} flex items-center justify-center flex-shrink-0`}>
                  {details.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{details.title}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {details.description}
                  </p>
                  <div className="flex items-center mt-1.5">
                    <span className="text-xs text-gray-500">{details.timeAgo}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <Droplet className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No recent activities</p>
            <p className="text-sm text-gray-400 mt-1">New activities will appear here</p>
          </div>
        )}
      </div>
      
      {activities.length > 5 && (
        <div className="border-t p-3 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All Activities
          </button>
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;