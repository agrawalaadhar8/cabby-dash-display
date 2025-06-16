
import React, { useState, useEffect } from 'react';
import SpeedGauge from './SpeedGauge';
import ClockDisplay from './ClockDisplay';
import CabNotifications from './CabNotifications';
import SwipeableInfoCard from './SwipeableInfoCard';
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
        {/* Top Status Bar */}
        <div className="flex justify-between items-center mb-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">ECO MODE</h1>
            <div className="text-sm text-gray-400">
              Status: <span className="text-green-400 font-semibold">ACTIVE</span>
            </div>
            <div className="text-sm text-gray-400">
              Range: <span className="text-cyan-400 font-mono">{Math.round(batteryLevel * 3.2)} km</span>
            </div>
          </div>
          <ClockDisplay />
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Left Side - Swipeable Info Card */}
          <div className="lg:col-span-3">
            <SwipeableInfoCard 
              batteryLevel={batteryLevel}
              isCharging={isCharging}
              onToggleCharging={() => setIsCharging(!isCharging)}
            />
          </div>

          {/* Center - Main Speed Gauge */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <SpeedGauge speed={speed} batteryLevel={batteryLevel} />
          </div>

          {/* Right Side - Rider Details */}
          <div className="lg:col-span-3">
            <RiderDetails />
          </div>
        </div>

        {/* Bottom Row - Notifications */}
        <div className="grid grid-cols-1">
          <CabNotifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
