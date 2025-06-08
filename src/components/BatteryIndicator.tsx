
import React from 'react';
import { battery } from 'lucide-react';

interface BatteryIndicatorProps {
  level: number;
  isCharging: boolean;
  onToggleCharging: () => void;
}

const BatteryIndicator = ({ level, isCharging, onToggleCharging }: BatteryIndicatorProps) => {
  const getBatteryColor = () => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBatteryBgColor = () => {
    if (level > 60) return 'bg-green-400';
    if (level > 30) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sky-400">Battery</h3>
        {isCharging && (
          <div className="flex items-center text-green-400 text-sm">
            ⚡ Charging
          </div>
        )}
      </div>

      {/* Battery Visual */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Battery body */}
          <div className="w-32 h-16 border-2 border-gray-600 rounded-lg bg-gray-900">
            {/* Battery fill */}
            <div 
              className={`h-full ${getBatteryBgColor()} rounded-md transition-all duration-1000 ease-out`}
              style={{ width: `${level}%` }}
            ></div>
          </div>
          
          {/* Battery terminal */}
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gray-600 rounded-r"></div>
          
          {/* Battery percentage overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${level > 50 ? 'text-gray-900' : 'text-white'}`}>
              {Math.round(level)}%
            </span>
          </div>
        </div>
      </div>

      {/* Battery stats */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={getBatteryColor()}>
            {isCharging ? 'Charging' : level > 20 ? 'Good' : 'Low'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Range:</span>
          <span className="text-white">{Math.round(level * 3.2)} km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time to full:</span>
          <span className="text-white">
            {isCharging ? `${Math.round((100 - level) * 2)} min` : '--'}
          </span>
        </div>
      </div>

      {/* Charging toggle button */}
      <button
        onClick={onToggleCharging}
        className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
          isCharging 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
      >
        {isCharging ? 'Stop Charging' : 'Start Charging'}
      </button>
    </div>
  );
};

export default BatteryIndicator;
