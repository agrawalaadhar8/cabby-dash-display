
import React from 'react';

interface SpeedGaugeProps {
  speed: number;
}

const SpeedGauge = ({ speed }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const rotation = (percentage / 100) * 270 - 135; // 270 degree arc starting from -135deg

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-sky-400 mb-4 text-center">Speed</h3>
      
      <div className="relative w-64 h-64 mx-auto">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        
        {/* Speed arc background */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-45" viewBox="0 0 100 100">
          <path
            d="M 20 50 A 30 30 0 1 1 80 50"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active speed arc */}
          <path
            d="M 20 50 A 30 30 0 1 1 80 50"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 1.88} 188`}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Speed needle */}
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-24 bg-sky-400 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-500 ease-out"
          style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
        ></div>

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-sky-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Speed readout */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 text-center">
          <div className="text-4xl font-bold text-white">{Math.round(speed)}</div>
          <div className="text-sm text-gray-400">km/h</div>
        </div>
      </div>

      {/* Speed markers */}
      <div className="flex justify-between text-xs text-gray-400 mt-4">
        <span>0</span>
        <span>30</span>
        <span>60</span>
        <span>90</span>
        <span>120</span>
      </div>
    </div>
  );
};

export default SpeedGauge;
