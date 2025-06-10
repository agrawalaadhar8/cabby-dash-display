
import React from 'react';

interface SpeedGaugeProps {
  speed: number;
}

const SpeedGauge = ({ speed }: SpeedGaugeProps) => {
  const maxSpeed = 120;
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const rotation = (percentage / 100) * 270 - 135; // 270 degree arc starting from -135deg

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-sky-400 mb-6 text-center">SPEED</h3>
      
      <div className="relative w-80 h-80 mx-auto">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-700 shadow-inner"></div>
        
        {/* Speed arc background */}
        <svg className="absolute inset-4 w-72 h-72 transform -rotate-45" viewBox="0 0 100 100">
          <path
            d="M 15 50 A 35 35 0 1 1 85 50"
            fill="none"
            stroke="#374151"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Active speed arc */}
          <path
            d="M 15 50 A 35 35 0 1 1 85 50"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.2} 220`}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Speed needle */}
        <div 
          className="absolute top-1/2 left-1/2 w-1.5 h-32 bg-sky-400 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-500 ease-out shadow-lg"
          style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
        ></div>

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-sky-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-gray-800"></div>

        {/* Speed readout */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 text-center">
          <div className="text-6xl font-bold text-white font-mono">{Math.round(speed)}</div>
          <div className="text-lg text-gray-400 font-semibold">km/h</div>
        </div>

        {/* Digital displays */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black rounded px-3 py-1">
          <div className="text-green-400 text-sm font-mono">{speed > 0 ? 'DRIVE' : 'PARK'}</div>
        </div>
      </div>

      {/* Speed markers with better styling */}
      <div className="flex justify-between text-sm text-gray-400 mt-6 px-4">
        <span className="font-mono">0</span>
        <span className="font-mono">30</span>
        <span className="font-mono">60</span>
        <span className="font-mono">90</span>
        <span className="font-mono">120</span>
      </div>
    </div>
  );
};

export default SpeedGauge;
