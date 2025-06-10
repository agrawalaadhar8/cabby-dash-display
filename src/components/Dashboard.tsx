
import React, { useState, useEffect } from 'react';
import SpeedGauge from './SpeedGauge';
import BatteryIndicator from './BatteryIndicator';
import ClockDisplay from './ClockDisplay';
import CabNotifications from './CabNotifications';
import TripInfo from './TripInfo';
import BatterySwapAnimation from './BatterySwapAnimation';
import RiderDetails from './RiderDetails';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-2">
      <div className="max-w-7xl mx-auto">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center mb-4 bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-sky-400">TAXI MID</h1>
            <div className="text-sm text-gray-400">
              Status: <span className="text-green-400">ACTIVE</span>
            </div>
          </div>
          <ClockDisplay />
        </div>

        {/* Main MID Layout - 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          
          {/* Left Column - Driver & Vehicle Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-800 border border-gray-600 rounded-2xl p-4">
              <h3 className="text-md font-semibold text-sky-400 mb-3">Vehicle</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span className="text-white">Tesla Model Y</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plate:</span>
                  <span className="text-white">TXI-2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Range:</span>
                  <span className="text-white">{Math.round(batteryLevel * 3.2)} km</span>
                </div>
              </div>
            </div>
            
            <BatterySwapAnimation />
          </div>

          {/* Center Column - Speed Gauge (Main Focus) */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="w-full max-w-md">
              <SpeedGauge speed={speed} />
            </div>
          </div>

          {/* Right Column - Rider & Trip Details */}
          <div className="lg:col-span-1 space-y-4">
            <RiderDetails />
          </div>
        </div>

        {/* Bottom Row - Battery, Trip Info, and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <BatteryIndicator 
            level={batteryLevel} 
            isCharging={isCharging}
            onToggleCharging={() => setIsCharging(!isCharging)}
          />
          <TripInfo />
          <CabNotifications />
        </div>

        {/* Bottom Controls - Compact */}
        <div className="grid grid-cols-4 gap-2">
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105">
            <div className="text-lg mb-1">🚗</div>
            <div className="text-xs text-gray-300">Vehicle</div>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105">
            <div className="text-lg mb-1">⚙️</div>
            <div className="text-xs text-gray-300">Settings</div>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105">
            <div className="text-lg mb-1">📍</div>
            <div className="text-xs text-gray-300">Navigation</div>
          </button>
          <button className="bg-red-700 hover:bg-red-600 border border-red-500 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105">
            <div className="text-lg mb-1">🚨</div>
            <div className="text-xs text-gray-300">Emergency</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
