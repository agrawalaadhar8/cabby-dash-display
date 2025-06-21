import React from 'react';

interface SpeedGaugeProps {
  speed: number;
  batteryLevel: number;
}

const SpeedGauge = ({ speed, batteryLevel }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  
  // Speed markers at regular intervals
  const speedMarkers = [0, 20, 40, 60, 80, 100, 120];
  
  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 blur-sm"></div>
      
      {/* Main Circular Gauge */}
      <div className="relative w-80 h-80">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* Background arc - semicircle from left to right (top half) */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="rgba(55, 65, 81, 0.3)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Progress arc with glow effect */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="4"
            strokeDasharray="219.91"
            strokeDashoffset={219.91 - (219.91 * percentage) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
            }}
          />
          
          {/* Speed indicator bars */}
          {speedMarkers.map((marker, index) => {
            const angle = 180 - (index * 180) / (speedMarkers.length - 1);
            const radian = (angle * Math.PI) / 180;
            const innerRadius = 65;
            const outerRadius = 75;
            const x1 = 100 + innerRadius * Math.cos(radian);
            const y1 = 100 - innerRadius * Math.sin(radian);
            const x2 = 100 + outerRadius * Math.cos(radian);
            const y2 = 100 - outerRadius * Math.sin(radian);
            
            return (
              <line
                key={marker}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={marker % 40 === 0 ? "#06b6d4" : "#6b7280"}
                strokeWidth={marker % 40 === 0 ? "2" : "1"}
                strokeLinecap="round"
              />
            );
          })}
          
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
            <div className="text-5xl font-mono font-bold text-white leading-none tracking-wider" style={{
              fontFamily: 'Orbitron, monospace',
              textShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)',
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
            }}>
              {Math.round(speed)}
            </div>
            <div className="text-xl text-cyan-400 font-semibold tracking-widest mt-1">
              km/h
            </div>
          </div>

          {/* Battery Percentage */}
          <div className="text-center mt-4">
            <div className="text-2xl font-mono font-bold text-green-400">
              {Math.round(batteryLevel)}%
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              {batteryLevel > 90 ? 'Fully Charged' : batteryLevel > 20 ? 'Good' : 'Low Battery'}
            </div>
          </div>
        </div>

        {/* Speed Markers - Text labels positioned above the arc */}
        <div className="absolute inset-0">
          {speedMarkers.map((marker, index) => {
            const angle = 180 - (index * 180) / (speedMarkers.length - 1);
            const radian = (angle * Math.PI) / 180;
            const radius = 90;
            const x = 50 + (radius * Math.cos(radian)) / 2;
            const y = 50 - (radius * Math.sin(radian)) / 2;
            
            return (
              <div
                key={marker}
                className="absolute text-xs text-gray-400 font-mono font-semibold"
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
        <div className="text-cyan-400 text-sm font-mono font-semibold tracking-wider">
          {speed > 0 ? 'DRIVE' : 'PARK'}
        </div>
      </div>

      {/* Bottom Icon Space */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-full flex items-center justify-center">
          <img 
            src="/speedometer-icon.png" 
            alt="Speedometer Icon" 
            className="w-10 h-10 object-contain"
            onError={(e) => {
              // Fallback to a simple icon if image doesn't exist
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.style.display = 'block';
            }}
          />
          <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center hidden">
            <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
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
