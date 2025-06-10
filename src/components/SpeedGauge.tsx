
import React from 'react';
import { Battery, Car, Zap, Eco } from 'lucide-react';

interface SpeedGaugeProps {
  speed: number;
  batteryLevel?: number;
  isCharging?: boolean;
}

const SpeedGauge = ({ speed, batteryLevel = 78, isCharging = false }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  
  const getBatteryColor = () => {
    if (batteryLevel > 60) return '#10b981'; // green-500
    if (batteryLevel > 30) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 blur-sm"></div>
      
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
            <Eco size={16} className="text-green-400" />
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
    </div>
  );
};

export default SpeedGauge;
