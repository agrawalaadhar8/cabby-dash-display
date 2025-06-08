
import React, { useState, useEffect } from 'react';
import SpeedGauge from './SpeedGauge';
import BatteryIndicator from './BatteryIndicator';
import ClockDisplay from './ClockDisplay';
import CabNotifications from './CabNotifications';
import TripInfo from './TripInfo';

const Dashboard = () => {
  const [speed, setSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [isCharging, setIsCharging] = useState(false);

  // Simulate speed changes for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(120, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate battery changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        if (isCharging) {
          return Math.min(100, prev + 1);
        } else {
          return Math.max(0, prev - 0.1);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isCharging]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-sky-400">Vehicle Dashboard</h1>
            <div className="text-sm text-gray-400">
              Status: <span className="text-green-400">Active</span>
            </div>
          </div>
          <ClockDisplay />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Speed Gauge - Main Focus */}
          <div className="lg:col-span-1">
            <SpeedGauge speed={speed} />
          </div>

          {/* Battery and Trip Info */}
          <div className="lg:col-span-1 space-y-6">
            <BatteryIndicator 
              level={batteryLevel} 
              isCharging={isCharging}
              onToggleCharging={() => setIsCharging(!isCharging)}
            />
            <TripInfo speed={speed} />
          </div>

          {/* Cab Notifications */}
          <div className="lg:col-span-1">
            <CabNotifications />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 text-center transition-all duration-200 hover:scale-105">
            <div className="text-2xl mb-2">🚗</div>
            <div className="text-sm text-gray-300">Vehicle Info</div>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 text-center transition-all duration-200 hover:scale-105">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm text-gray-300">Settings</div>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 text-center transition-all duration-200 hover:scale-105">
            <div className="text-2xl mb-2">📍</div>
            <div className="text-sm text-gray-300">Navigation</div>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 text-center transition-all duration-200 hover:scale-105">
            <div className="text-2xl mb-2">📞</div>
            <div className="text-sm text-gray-300">Emergency</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
