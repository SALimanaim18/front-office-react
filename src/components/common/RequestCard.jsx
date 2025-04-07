import React from "react";
import { cn } from '../../lib/utils';
import Button from "./Button";
import { Calendar, MapPin } from "lucide-react";

const RequestCard = ({
name,
bloodType,
location,
date,
urgent = false,
className,
}) => {
  return (
<div
    className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1",
        urgent ? "border-l-4 border-sangred-DEFAULT" : "",
        className
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                urgent
                  ? "bg-sangred-DEFAULT text-white"
                  : "bg-sangblue-light text-sangred-DEFAULT"
              )}
            >
              {bloodType}
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{name}</h3>
              {urgent && (
                <span className="text-xs bg-sangred-DEFAULT/10 text-sangred-DEFAULT px-2 py-0.5 rounded-full">
                  Urgent
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-sangred-DEFAULT" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-sangred-DEFAULT" />
            <span>{date}</span>
          </div>
        </div>

        <Button variant="primary" size="sm" fullWidth>
          Je veux aider
        </Button>
      </div>
    </div>
  );
};

export default RequestCard;
