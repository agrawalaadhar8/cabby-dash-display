
import React, { useState, useEffect } from 'react';
import SpeedGauge from './SpeedGauge';
import ClockDisplay from './ClockDisplay';
import SwipeableInfoCard from './SwipeableInfoCard';
import RiderDetails from './RiderDetails';
import SwipeableRiderDetails from './SwipeableRiderDetails';

const Dashboard = () => {
  const [speed, setSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [isCharging, setIsCharging] = useState(false);
  const [rideStatus, setRideStatus] = useState<'idle' | 'picking_up' | 'in_ride' | 'dropping_off'>('idle');
  const [isOnline, setIsOnline] = useState(false);

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

  const handleToggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (isOnline) {
      // Going offline - reset to idle state
      setRideStatus('idle');
    }
  };

  const handleAcceptRide = () => {
    setRideStatus('picking_up');
  };

  const handleStartRide = () => {
    setRideStatus('in_ride');
  };

  const handleEndRide = () => {
    setRideStatus('idle');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background with optional image and gradients */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 h-screen flex flex-col">
        {/* Main Dashboard Layout - Fixed height container */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-6 h-96">
            {/* Left Side - Swipeable Info Card */}
            <div className="w-80 h-full">
              <SwipeableInfoCard 
                batteryLevel={batteryLevel}
                isCharging={isCharging}
                onToggleCharging={() => setIsCharging(!isCharging)}
                rideStatus={rideStatus}
                isOnline={isOnline}
                onToggleOnlineStatus={handleToggleOnlineStatus}
                onAcceptRide={handleAcceptRide}
                onStartRide={handleStartRide}
                onEndRide={handleEndRide}
              />
            </div>

            {/* Center - Main Speed Gauge */}
            <div className="flex items-center justify-center h-full">
              <SpeedGauge speed={speed} batteryLevel={batteryLevel} />
            </div>

            {/* Right Side - Rider Details (swipeable) */}
            <div className="w-80 h-full">
              <SwipeableRiderDetails />
            </div>
          </div>
        </div>

        {/* Bottom Status Bar - positioned right below the main content */}
        <div className="flex justify-between items-center mt-6 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-400">
              Status: <span className="text-green-400 font-semibold">ACTIVE</span>
            </div>
            <div className="text-sm text-gray-400">
              Range: <span className="text-cyan-400 font-mono">{Math.round(batteryLevel * 3.2)} km</span>
            </div>
          </div>
          <ClockDisplay />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
