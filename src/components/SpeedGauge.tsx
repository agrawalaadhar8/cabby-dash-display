
import React from 'react';
import { Battery, Car, Zap, Leaf, MapPin, Clock, Gauge } from 'lucide-react';

interface SpeedGaugeProps {
  speed: number;
  batteryLevel?: number;
  isCharging?: boolean;
  onToggleCharging?: () => void;
}

const SpeedGauge = ({ speed, batteryLevel = 78, isCharging = false, onToggleCharging }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  
  const getBatteryColor = () => {
    if (batteryLevel > 60) return '#10b981'; // green-500
    if (batteryLevel > 30) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 blur-sm"></div>
      
      {/* Top Semicircle - Trip Information */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-4 min-w-[280px]">
          <h3 className="text-sm font-semibold text-sky-400 mb-3 text-center">Trip Info</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-green-400" />
                <span className="text-gray-300">Distance</span>
              </div>
              <span className="text-white font-mono">12.5km</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-blue-400" />
                <span className="text-gray-300">Duration</span>
              </div>
              <span className="text-white font-mono">25min</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Gauge className="h-3 w-3 text-yellow-400" />
                <span className="text-gray-300">Avg Speed</span>
              </div>
              <span className="text-white font-mono">30km/h</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-gray-300">Fare</span>
              </div>
              <span className="text-white font-mono">$15.80</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Circular Gauge */}
      <div className="relative w-80 h-80">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="rgba(55, 65, 81, 0.3)"
            strokeWidth="3"
            strokeDasharray="534.07"
            strokeLinecap="round"
          />
          
          {/* Progress arc with glow effect */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="4"
            strokeDasharray="534.07"
            strokeDashoffset={534.07 - (534.07 * percentage) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
            }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Main Speed Display */}
          <div className="text-center mb-2">
            <div className="text-7xl font-mono font-bold text-white leading-none tracking-wider">
              {Math.round(speed)}
            </div>
            <div className="text-xl text-cyan-400 font-semibold tracking-widest mt-1">
              km/h
            </div>
          </div>

          {/* Integrated Battery Status */}
          <div className="text-center mt-2">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Battery 
                size={16} 
                style={{ color: getBatteryColor() }}
                fill={getBatteryColor()}
              />
              {isCharging && (
                <Zap size={12} className="text-yellow-400 animate-pulse" />
              )}
              <span className="text-lg font-mono font-bold" style={{ color: getBatteryColor() }}>
                {Math.round(batteryLevel)}%
              </span>
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              {isCharging ? 'Charging' : batteryLevel > 20 ? 'Good' : 'Low'}
            </div>
          </div>
        </div>

        {/* Speed Markers */}
        <div className="absolute inset-0">
          {[0, 30, 60, 90, 120].map((marker, index) => {
            const angle = (index * 270) / 4 - 135; // Distribute across 270 degrees
            const radian = (angle * Math.PI) / 180;
            const x = 100 + 75 * Math.cos(radian);
            const y = 100 + 75 * Math.sin(radian);
            
            return (
              <div
                key={marker}
                className="absolute text-xs text-gray-400 font-mono"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {marker}
              </div>
            );
          })}
        </div>

        {/* Corner Icons - Vehicle Info */}
        {/* Top Left - ECO Mode */}
        <div className="absolute top-2 left-2">
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-2">
            <Leaf size={16} className="text-green-400" />
          </div>
        </div>

        {/* Top Right - Vehicle Type */}
        <div className="absolute top-2 right-2">
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2">
            <Car size={16} className="text-cyan-400" />
          </div>
        </div>

        {/* Bottom Left - Gear/Mode */}
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-1">
            <div className="text-cyan-400 text-xs font-mono font-semibold">
              {speed > 0 ? 'D' : 'P'}
            </div>
          </div>
        </div>

        {/* Bottom Right - Power */}
        <div className="absolute bottom-2 right-2">
          <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg px-2 py-1">
            <div className="text-green-400 text-xs font-mono font-semibold">
              156kW
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Semicircle - Battery Swap Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-4 min-w-[280px]">
          <h3 className="text-sm font-semibold text-sky-400 mb-3 text-center">Battery Swap</h3>
          <div className="flex flex-col items-center space-y-3">
            {/* Battery Visualization */}
            <div className="relative w-20 h-10">
              <div className="w-20 h-10 bg-gray-700 rounded border-2 border-gray-500">
                <div 
                  className="h-full rounded transition-all duration-300"
                  style={{ 
                    width: `${batteryLevel}%`,
                    backgroundColor: getBatteryColor()
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                {Math.round(batteryLevel)}%
              </div>
            </div>
            
            {/* Swap Status */}
            <div className="text-center">
              <div className="text-xs text-gray-300">
                {isCharging ? 'Charging...' : 'Ready for swap'}
              </div>
              <div className="text-xs text-gray-400">
                {isCharging ? 'Please wait' : 'Est: 2 min'}
              </div>
            </div>

            {/* Swap/Charge Toggle */}
            <button
              onClick={onToggleCharging}
              className={`px-4 py-1 rounded-lg text-xs font-medium transition-all ${
                isCharging 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {isCharging ? 'Stop Charging' : 'Start Charging'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;
