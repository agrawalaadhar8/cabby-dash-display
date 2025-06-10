
import React, { useState, useEffect } from 'react';

const BatterySwapAnimation = () => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapProgress, setSwapProgress] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(25);

  const startSwap = () => {
    setIsSwapping(true);
    setSwapProgress(0);
    
    const interval = setInterval(() => {
      setSwapProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSwapping(false);
          setBatteryLevel(100);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-4">
      <h3 className="text-lg font-semibold text-sky-400 mb-4 text-center">Battery Swap</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Battery Swap Animation */}
        <div className="relative w-32 h-20">
          {/* Old Battery (sliding out) */}
          <div 
            className={`absolute w-28 h-16 bg-red-600 rounded-lg border-2 border-gray-400 transition-transform duration-1000 ${
              isSwapping ? 'transform translate-x-36 opacity-0' : ''
            }`}
          >
            <div className="absolute inset-2 bg-red-500 rounded" style={{ width: `${batteryLevel}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {batteryLevel}%
            </div>
          </div>
          
          {/* New Battery (sliding in) */}
          <div 
            className={`absolute w-28 h-16 bg-green-600 rounded-lg border-2 border-gray-400 transition-transform duration-1000 ${
              isSwapping ? 'transform translate-x-0' : 'transform -translate-x-36 opacity-0'
            }`}
          >
            <div className="absolute inset-2 bg-green-500 rounded w-full"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              100%
            </div>
          </div>
          
          {/* Swap Progress Bar */}
          {isSwapping && (
            <div className="absolute -bottom-6 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-sky-400 h-2 rounded-full transition-all duration-100"
                style={{ width: `${swapProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Swap Status */}
        <div className="text-center">
          <div className="text-sm text-gray-300">
            {isSwapping ? `Swapping... ${swapProgress}%` : 'Ready for swap'}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {isSwapping ? 'Please wait' : 'Estimated time: 2 min'}
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={startSwap}
          disabled={isSwapping}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            isSwapping 
              ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
              : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          {isSwapping ? 'Swapping...' : 'Start Swap'}
        </button>
      </div>
    </div>
  );
};

export default BatterySwapAnimation;
