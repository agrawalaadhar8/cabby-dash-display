
import React, { useState, useEffect } from 'react';
import { speedometer } from 'lucide-react';

interface TripInfoProps {
  speed: number;
}

const TripInfo = ({ speed }: TripInfoProps) => {
  const [tripDistance, setTripDistance] = useState(0);
  const [tripTime, setTripTime] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);

  // Simulate trip tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (speed > 0) {
        setTripTime(prev => prev + 1);
        setTripDistance(prev => prev + (speed / 3600)); // km
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [speed]);

  // Calculate average speed
  useEffect(() => {
    if (tripTime > 0) {
      setAvgSpeed(tripDistance / (tripTime / 3600));
    }
  }, [tripDistance, tripTime]);

  const resetTrip = () => {
    setTripDistance(0);
    setTripTime(0);
    setAvgSpeed(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sky-400">Trip Info</h3>
        <button
          onClick={resetTrip}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Trip Distance */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Distance</div>
          <div className="text-xl font-bold text-white">
            {tripDistance.toFixed(1)} <span className="text-sm text-gray-400">km</span>
          </div>
        </div>

        {/* Trip Time */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Duration</div>
          <div className="text-xl font-bold text-white font-mono">
            {formatTime(tripTime)}
          </div>
        </div>

        {/* Average Speed */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-sm text-gray-400 mb-1">Avg Speed</div>
          <div className="text-xl font-bold text-white">
            {avgSpeed.toFixed(1)} <span className="text-sm text-gray-400">km/h</span>
          </div>
        </div>

        {/* Current Speed (small) */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 rounded-lg p-3">
          <div className="text-sm text-sky-100 mb-1">Current Speed</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(speed)} <span className="text-sm text-sky-100">km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
