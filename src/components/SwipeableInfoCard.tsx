import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Gauge, MapPin, Clock, Battery, Wifi, WifiOff, DoorClosed, DoorOpen, Thermometer, Car } from 'lucide-react';
import BatterySwapAnimation from './BatterySwapAnimation';
import { Switch } from './ui/switch';

interface SwipeableInfoCardProps {
  batteryLevel: number;
  isCharging: boolean;
  onToggleCharging: () => void;
  rideStatus: 'idle' | 'picking_up' | 'in_ride' | 'dropping_off';
  isOnline: boolean;
  onToggleOnlineStatus: () => void;
  onAcceptRide: () => void;
  onStartRide: () => void;
  onEndRide: () => void;
  onCarIndicatorsChange?: (indicators: any) => void;
}

const SwipeableInfoCard = ({ 
  batteryLevel, 
  isCharging, 
  onToggleCharging,
  rideStatus,
  isOnline,
  onToggleOnlineStatus,
  onAcceptRide,
  onStartRide,
  onEndRide,
  onCarIndicatorsChange
}: SwipeableInfoCardProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showBatterySwap, setShowBatterySwap] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Car indicators state
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

  // Notify parent component of car indicator changes
  useEffect(() => {
    if (onCarIndicatorsChange) {
      onCarIndicatorsChange({
        doorStatus,
        seatbeltStatus,
        temperature,
        parkingBrake,
        acStatus
      });
    }
  }, [doorStatus, seatbeltStatus, temperature, parkingBrake, acStatus, onCarIndicatorsChange]);

  const getStatusColor = () => {
    if (!isOnline) return 'bg-gray-600';
    switch (rideStatus) {
      case 'idle': return 'bg-green-600';
      case 'picking_up': return 'bg-yellow-500';
      case 'in_ride': return 'bg-green-500';
      case 'dropping_off': return 'bg-blue-500';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    switch (rideStatus) {
      case 'idle': return 'Available';
      case 'picking_up': return 'En Route to Pickup';
      case 'in_ride': return 'Passenger On Board';
      case 'dropping_off': return 'Approaching Destination';
      default: return 'Unknown';
    }
  };

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
      title: '',
      content: (
        <div className="flex items-center justify-center h-full">
          <div className="w-full h-64 bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
            <span className="text-gray-400 text-sm">Vehicle Image</span>
          </div>
        </div>
      )
    },
    {
      title: 'CONTROLS',
      content: (
        <div className="space-y-4">
          {/* Door Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Door Controls</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Front Left</span>
                <Switch 
                  checked={doorStatus.frontLeft}
                  onCheckedChange={(checked) => setDoorStatus(prev => ({ ...prev, frontLeft: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Front Right</span>
                <Switch 
                  checked={doorStatus.frontRight}
                  onCheckedChange={(checked) => setDoorStatus(prev => ({ ...prev, frontRight: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Rear Left</span>
                <Switch 
                  checked={doorStatus.rearLeft}
                  onCheckedChange={(checked) => setDoorStatus(prev => ({ ...prev, rearLeft: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Rear Right</span>
                <Switch 
                  checked={doorStatus.rearRight}
                  onCheckedChange={(checked) => setDoorStatus(prev => ({ ...prev, rearRight: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Climate & Systems */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Climate & Systems</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs">❄️</span>
                  <span className="text-xs text-gray-300">Air Conditioning</span>
                </div>
                <Switch 
                  checked={acStatus}
                  onCheckedChange={setAcStatus}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="h-3 w-3 text-red-400" />
                  <span className="text-xs text-gray-300">Parking Brake</span>
                </div>
                <Switch 
                  checked={parkingBrake}
                  onCheckedChange={setParkingBrake}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Temperature</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setTemperature(prev => Math.max(16, prev - 1))}
                    className="w-6 h-6 bg-gray-700 rounded text-xs hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="text-white font-mono text-xs w-8 text-center">{temperature}°</span>
                  <button 
                    onClick={() => setTemperature(prev => Math.min(30, prev + 1))}
                    className="w-6 h-6 bg-gray-700 rounded text-xs hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Seatbelt Status */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Seatbelt Status</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div 
                className={`p-2 rounded text-center cursor-pointer transition-colors ${seatbeltStatus.driver ? 'bg-green-600' : 'bg-red-600'}`}
                onClick={() => setSeatbeltStatus(prev => ({ ...prev, driver: !prev.driver }))}
              >
                <div>Driver</div>
                <div className="text-lg">🔒</div>
              </div>
              <div 
                className={`p-2 rounded text-center cursor-pointer transition-colors ${seatbeltStatus.passenger ? 'bg-green-600' : 'bg-red-600'}`}
                onClick={() => setSeatbeltStatus(prev => ({ ...prev, passenger: !prev.passenger }))}
              >
                <div>Passenger</div>
                <div className="text-lg">🔒</div>
              </div>
            </div>
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
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-base ${
                isCharging 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isCharging ? 'Stop Charging' : 'Start Charging'}
            </button>
            
            <button
              onClick={() => setShowBatterySwap(true)}
              className="w-full py-3 px-4 rounded-lg font-medium bg-sky-600 hover:bg-sky-700 text-white transition-all duration-200 text-base"
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
    },
    {
      title: 'CAB STATUS',
      content: (
        <div className="space-y-4">
          {/* Current Status */}
          <div className={`${getStatusColor()} rounded-lg p-4 text-center`}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
              <div className="text-lg font-bold text-white">{getStatusText()}</div>
            </div>
            <div className="text-sm text-gray-200">
              {!isOnline && 'Driver offline'}
              {isOnline && rideStatus === 'idle' && 'Ready for new rides'}
              {rideStatus === 'picking_up' && 'ETA: 5 minutes'}
              {rideStatus === 'in_ride' && 'Destination: Downtown'}
              {rideStatus === 'dropping_off' && 'ETA: 2 minutes'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {rideStatus === 'picking_up' && isOnline && (
              <button
                onClick={onStartRide}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-base"
              >
                Start Ride
              </button>
            )}
            {rideStatus === 'in_ride' && isOnline && (
              <button
                onClick={onEndRide}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-base"
              >
                Complete Ride
              </button>
            )}
            {rideStatus === 'idle' && (
              <>
                <button 
                  onClick={onToggleOnlineStatus}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-base ${
                    isOnline 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
                {isOnline && (
                  <button
                    onClick={onAcceptRide}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-base"
                  >
                    Accept New Ride
                  </button>
                )}
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-800 rounded p-2 text-center">
              <div className="text-cyan-400 font-bold">8</div>
              <div className="text-gray-400">Today's Rides</div>
            </div>
            <div className="bg-gray-800 rounded p-2 text-center">
              <div className="text-green-400 font-bold">$156</div>
              <div className="text-gray-400">Today's Earnings</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-swipe functionality  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      prevCard();
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (showBatterySwap) {
    return (
      <div className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 h-full">
        <BatterySwapAnimation onClose={() => setShowBatterySwap(false)} />
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 relative select-none h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation arrows */}
      <button
        onClick={prevCard}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors touch-manipulation"
        disabled={cards.length <= 1}
      >
        <ChevronLeft className="h-5 w-5 text-cyan-400" />
      </button>
      
      <button
        onClick={nextCard}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors touch-manipulation"
        disabled={cards.length <= 1}
      >
        <ChevronRight className="h-5 w-5 text-cyan-400" />
      </button>

      {/* Card content */}
      <div className="px-8 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-cyan-400 mb-3 tracking-wide text-center">
          {cards[currentCard].title}
        </h3>
        <div className="flex-1 overflow-y-auto">
          {cards[currentCard].content}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={`w-3 h-3 rounded-full transition-colors touch-manipulation ${
                index === currentCard ? 'bg-cyan-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeableInfoCard;
