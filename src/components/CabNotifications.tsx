
import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'pickup' | 'dropoff' | 'payment' | 'rating' | 'info';
  title: string;
  message: string;
  time: string;
  urgent?: boolean;
}

const CabNotifications = () => {
  const [rideStatus, setRideStatus] = useState<'idle' | 'picking_up' | 'in_ride' | 'dropping_off'>('idle');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'pickup',
      title: 'New Ride Request',
      message: 'Passenger waiting at Central Station',
      time: '2 min ago',
      urgent: true
    },
    {
      id: '2',
      type: 'info',
      title: 'Traffic Update',
      message: 'Alternative route suggested',
      time: '5 min ago'
    }
  ]);

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'idle': return 'bg-gray-600';
      case 'picking_up': return 'bg-yellow-500';
      case 'in_ride': return 'bg-green-500';
      case 'dropping_off': return 'bg-blue-500';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = () => {
    switch (rideStatus) {
      case 'idle': return 'Available';
      case 'picking_up': return 'En Route to Pickup';
      case 'in_ride': return 'Passenger On Board';
      case 'dropping_off': return 'Approaching Destination';
      default: return 'Unknown';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'pickup': return '🚖';
      case 'dropoff': return '🏁';
      case 'payment': return '💳';
      case 'rating': return '⭐';
      default: return 'ℹ️';
    }
  };

  const acceptRide = () => {
    setRideStatus('picking_up');
    // Remove the pickup notification
    setNotifications(prev => prev.filter(n => n.type !== 'pickup'));
  };

  const startRide = () => {
    setRideStatus('in_ride');
  };

  const endRide = () => {
    setRideStatus('idle');
    // Add completion notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'payment',
      title: 'Ride Completed',
      message: 'Payment received: $15.50',
      time: 'Now'
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6 h-full">
      <h3 className="text-lg font-semibold text-sky-400 mb-4">Cab Status</h3>

      {/* Current Status */}
      <div className="mb-6">
        <div className={`${getStatusColor()} rounded-lg p-4 text-center`}>
          <div className="text-lg font-bold text-white">{getStatusText()}</div>
          <div className="text-sm text-gray-200 mt-1">
            {rideStatus === 'idle' && 'Ready for new rides'}
            {rideStatus === 'picking_up' && 'ETA: 5 minutes'}
            {rideStatus === 'in_ride' && 'Destination: Downtown'}
            {rideStatus === 'dropping_off' && 'ETA: 2 minutes'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 space-y-3">
        {rideStatus === 'picking_up' && (
          <button
            onClick={startRide}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Start Ride
          </button>
        )}
        {rideStatus === 'in_ride' && (
          <button
            onClick={endRide}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Complete Ride
          </button>
        )}
        {rideStatus === 'idle' && (
          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Go Online
          </button>
        )}
      </div>

      {/* Notifications */}
      <div>
        <h4 className="text-md font-medium text-gray-300 mb-3">Notifications</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all ${
                notification.urgent
                  ? 'bg-red-900/30 border-red-500 shadow-lg'
                  : 'bg-gray-700 border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                  <div>
                    <div className="font-medium text-white text-sm">{notification.title}</div>
                    <div className="text-gray-300 text-xs">{notification.message}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{notification.time}</div>
              </div>
              
              {notification.type === 'pickup' && rideStatus === 'idle' && (
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={acceptRide}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs font-medium transition-colors">
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabNotifications;
