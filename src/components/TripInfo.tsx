
import React from 'react';
import { Gauge, MapPin, Clock } from 'lucide-react';

const TripInfo = () => {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-sky-400 mb-4">Trip Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-green-400" />
            <span className="text-gray-300">Distance</span>
          </div>
          <span className="text-white font-mono">12.5 km</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-gray-300">Duration</span>
          </div>
          <span className="text-white font-mono">25 min</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-yellow-400" />
            <span className="text-gray-300">Avg Speed</span>
          </div>
          <span className="text-white font-mono">30 km/h</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-gray-300">Fare</span>
          </div>
          <span className="text-white font-mono">$15.80</span>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
