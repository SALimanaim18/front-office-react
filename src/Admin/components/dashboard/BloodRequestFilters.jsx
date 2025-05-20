import React from 'react';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from '../../../components/ui/input';

const BloodRequestFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6 animate-fade-in">
      <div className="w-full md:w-1/3">
        <Input placeholder="Search patient name or ID..." />
      </div>
      
      <div className="flex gap-3 flex-1">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Blood Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
            <SelectItem value="houston">Houston</SelectItem>
            <SelectItem value="phoenix">Phoenix</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="bg-[#d93f31] hover:bg-primary-light">
        Apply Filters
      </Button>
    </div>
  );
};

export default BloodRequestFilters;
