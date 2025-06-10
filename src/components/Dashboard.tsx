import React, { useState, useEffect } from 'react';
import SpeedGauge from './SpeedGauge';
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background with subtle gradient and grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* Single Row Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center min-h-screen">
          
          {/* Left Side - Rider & Battery Swap */}
          <div className="lg:col-span-1 space-y-4">
            <RiderDetails />
            <BatterySwapAnimation />
          </div>

          {/* Center - Main Speed Gauge with integrated info */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <SpeedGauge 
              speed={speed} 
              batteryLevel={batteryLevel}
              isCharging={isCharging}
            />
          </div>

          {/* Right Side - Trip Info & Notifications */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex justify-end mb-4">
              <ClockDisplay />
            </div>
            <TripInfo />
            <CabNotifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
