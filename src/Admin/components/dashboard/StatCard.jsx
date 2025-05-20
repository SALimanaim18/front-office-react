import React from 'react';
import { cn } from '../../../lib/utils';

const StatCard = ({ title, value, icon, trend, className }) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.positive ? "+" : ""}{trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-opacity-10">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
