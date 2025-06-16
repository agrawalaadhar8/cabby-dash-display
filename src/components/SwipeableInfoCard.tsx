
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gauge, MapPin, Clock, Battery } from 'lucide-react';
import BatterySwapAnimation from './BatterySwapAnimation';

interface SwipeableInfoCardProps {
  batteryLevel: number;
  isCharging: boolean;
  onToggleCharging: () => void;
}

const SwipeableInfoCard = ({ batteryLevel, isCharging, onToggleCharging }: SwipeableInfoCardProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showBatterySwap, setShowBatterySwap] = useState(false);

  const cards = [
    {
      title: 'VEHICLE',
      content: (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Model</span>
            <span className="text-white font-mono">Tesla Model Y</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Plate</span>
            <span className="text-white font-mono">TXI-2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Mode</span>
            <span className="text-green-400 font-mono">ECO</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Gear</span>
            <span className="text-cyan-400 font-mono">P</span>
          </div>
        </div>
      )
    },
    {
      title: 'BATTERY',
      content: (
        <div className="space-y-4">
          {/* Battery Visual */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-16 border-2 border-gray-600 rounded-lg bg-gray-900">
                <div 
                  className={`h-full rounded-md transition-all duration-1000 ease-out ${
                    batteryLevel > 60 ? 'bg-green-400' : 
                    batteryLevel > 30 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gray-600 rounded-r"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${batteryLevel > 50 ? 'text-gray-900' : 'text-white'}`}>
                  {Math.round(batteryLevel)}%
                </span>
              </div>
            </div>
          </div>

          {/* Battery stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`${
                batteryLevel > 60 ? 'text-green-400' : 
                batteryLevel > 30 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {isCharging ? 'Charging' : batteryLevel > 20 ? 'Good' : 'Low'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Range:</span>
              <span className="text-white">{Math.round(batteryLevel * 3.2)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time to full:</span>
              <span className="text-white">
                {isCharging ? `${Math.round((100 - batteryLevel) * 2)} min` : '--'}
              </span>
            </div>
          </div>

          {/* Charging toggle and swap buttons */}
          <div className="space-y-2">
            <button
              onClick={onToggleCharging}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isCharging 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isCharging ? 'Stop Charging' : 'Start Charging'}
            </button>
            
            <button
              onClick={() => setShowBatterySwap(true)}
              className="w-full py-2 px-4 rounded-lg font-medium bg-sky-600 hover:bg-sky-700 text-white transition-all duration-200"
            >
              Battery Swap
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'TRIP INFO',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Distance</span>
            </div>
            <span className="text-white font-mono">12.5 km</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">Duration</span>
            </div>
            <span className="text-white font-mono">25 min</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300">Avg Speed</span>
            </div>
            <span className="text-white font-mono">30 km/h</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-300">Fare</span>
            </div>
            <span className="text-white font-mono">$15.80</span>
          </div>
        </div>
      )
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (showBatterySwap) {
    return (
      <div className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
        <BatterySwapAnimation onClose={() => setShowBatterySwap(false)} />
      </div>
    );
  }

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 relative">
      {/* Navigation arrows */}
      <button
        onClick={prevCard}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        disabled={cards.length <= 1}
      >
        <ChevronLeft className="h-4 w-4 text-cyan-400" />
      </button>
      
      <button
        onClick={nextCard}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        disabled={cards.length <= 1}
      >
        <ChevronRight className="h-4 w-4 text-cyan-400" />
      </button>

      {/* Card content */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-3 tracking-wide text-center">
          {cards[currentCard].title}
        </h3>
        <div className="min-h-[200px]">
          {cards[currentCard].content}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentCard ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableInfoCard;
