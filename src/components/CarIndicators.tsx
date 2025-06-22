
import React, { useState, useEffect } from 'react';
import { Thermometer, DoorClosed, DoorOpen } from 'lucide-react';

const CarIndicators = () => {
  const [doorStatus, setDoorStatus] = useState({
    frontLeft: false,
    frontRight: false,
    rearLeft: false,
    rearRight: false
  });
  const [seatbeltStatus, setSeatbeltStatus] = useState({
    driver: true,
    passenger: false,
    rearLeft: false,
    rearRight: false
  });
  const [temperature, setTemperature] = useState(22);
  const [parkingBrake, setParkingBrake] = useState(true);
  const [acStatus, setAcStatus] = useState(true);
  const [turnSignals, setTurnSignals] = useState({
    left: false,
    right: false
  });

  // Simulate some indicator changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle turn signals for demo
      if (Math.random() < 0.1) {
        setTurnSignals(prev => ({
          left: Math.random() < 0.5,
          right: Math.random() < 0.5
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top indicators */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {/* AC Status */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
          acStatus ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          <span>❄️</span>
          <span>{temperature}°C</span>
        </div>
        
        {/* Parking Brake */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
          parkingBrake ? 'bg-red-500/20 text-red-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          <span>🅿️</span>
          <span>BRAKE</span>
        </div>
      </div>

      {/* Left side indicators */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-3">
        {/* Left turn signal */}
        <div className={`w-8 h-6 rounded flex items-center justify-center text-lg transition-all duration-300 ${
          turnSignals.left ? 'bg-yellow-500 text-black animate-pulse' : 'bg-gray-600/20 text-gray-500'
        }`}>
          ←
        </div>
        
        {/* Door status - Front Left */}
        <div className={`w-8 h-8 rounded flex items-center justify-center ${
          doorStatus.frontLeft ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          {doorStatus.frontLeft ? <DoorOpen className="h-4 w-4" /> : <DoorClosed className="h-4 w-4" />}
        </div>

        {/* Seatbelt - Driver */}
        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
          seatbeltStatus.driver ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          🔒
        </div>
      </div>

      {/* Right side indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-3">
        {/* Right turn signal */}
        <div className={`w-8 h-6 rounded flex items-center justify-center text-lg transition-all duration-300 ${
          turnSignals.right ? 'bg-yellow-500 text-black animate-pulse' : 'bg-gray-600/20 text-gray-500'
        }`}>
          →
        </div>
        
        {/* Door status - Front Right */}
        <div className={`w-8 h-8 rounded flex items-center justify-center ${
          doorStatus.frontRight ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          {doorStatus.frontRight ? <DoorOpen className="h-4 w-4" /> : <DoorClosed className="h-4 w-4" />}
        </div>

        {/* Seatbelt - Passenger */}
        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
          seatbeltStatus.passenger ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          🔒
        </div>
      </div>

      {/* Bottom indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {/* Rear doors */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
          doorStatus.rearLeft ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          {doorStatus.rearLeft ? <DoorOpen className="h-3 w-3" /> : <DoorClosed className="h-3 w-3" />}
          <span>RL</span>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
          doorStatus.rearRight ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-600/20 text-gray-400'
        }`}>
          {doorStatus.rearRight ? <DoorOpen className="h-3 w-3" /> : <DoorClosed className="h-3 w-3" />}
          <span>RR</span>
        </div>

        {/* Temperature */}
        <div className="flex items-center space-x-1 px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
          <Thermometer className="h-3 w-3" />
          <span>{temperature}°C</span>
        </div>
      </div>

      {/* Interactive demo buttons (for testing - positioned at corners) */}
      <div className="absolute top-4 right-4 space-y-1 pointer-events-auto">
        <button 
          onClick={() => setDoorStatus(prev => ({ ...prev, frontLeft: !prev.frontLeft }))}
          className="text-xs bg-gray-800/50 px-2 py-1 rounded text-white hover:bg-gray-700/50"
        >
          Toggle FL Door
        </button>
        <button 
          onClick={() => setSeatbeltStatus(prev => ({ ...prev, driver: !prev.driver }))}
          className="text-xs bg-gray-800/50 px-2 py-1 rounded text-white hover:bg-gray-700/50"
        >
          Toggle Seatbelt
        </button>
        <button 
          onClick={() => setParkingBrake(!parkingBrake)}
          className="text-xs bg-gray-800/50 px-2 py-1 rounded text-white hover:bg-gray-700/50"
        >
          Toggle P-Brake
        </button>
      </div>
    </div>
  );
};

export default CarIndicators;
