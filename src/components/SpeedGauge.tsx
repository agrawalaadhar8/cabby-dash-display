
import React from 'react';

interface SpeedGaugeProps {
  speed: number;
}

const SpeedGauge = ({ speed }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  
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

          {/* Battery Percentage */}
          <div className="text-center mt-4">
            <div className="text-2xl font-mono font-bold text-green-400">
              100%
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              Fully Charged
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
      </div>

      {/* Mode Indicators */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2">
          <div className="text-cyan-400 text-sm font-mono font-semibold tracking-wider">
            {speed > 0 ? 'DRIVE' : 'PARK'}
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4 text-xs text-gray-400 font-mono">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            156 kW
          </span>
          <span>•</span>
          <span>ECO MODE</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;
