
import React, { useState, useEffect } from 'react';
import { User, MapPin, Navigation, Clock, CreditCard } from 'lucide-react';

interface RiderConfig {
  rider: {
    name: string;
    phone: string;
    rating: number;
    pickupLocation: string;
    dropLocation: string;
    estimatedTime: string;
    distance: string;
    fare: string;
  };
  vehicle: {
    model: string;
    licensePlate: string;
    batteryCapacity: string;
    range: string;
  };
  trip: {
    tripId: string;
    startTime: string;
    rideType: string;
    paymentMethod: string;
  };
}

const RiderDetails = () => {
  const [config, setConfig] = useState<RiderConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/src/data/riderConfig.json');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.log('Loading default config');
        // Fallback config
        setConfig({
          rider: {
            name: "John Smith",
            phone: "+1 (555) 123-4567",
            rating: 4.8,
            pickupLocation: "Central Station, Platform 2",
            dropLocation: "Downtown Mall, Main Entrance",
            estimatedTime: "12 min",
            distance: "5.2 km",
            fare: "$18.50"
          },
          vehicle: {
            model: "Tesla Model Y",
            licensePlate: "TXI-2024",
            batteryCapacity: "75 kWh",
            range: "450 km"
          },
          trip: {
            tripId: "TXI-789456",
            startTime: "14:30",
            rideType: "Premium",
            paymentMethod: "Credit Card"
          }
        });
      }
    };

    loadConfig();
  }, []);

  if (!config) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-4">
      <h3 className="text-lg font-semibold text-sky-400 mb-4">Current Ride</h3>
      
      <div className="space-y-4">
        {/* Rider Info */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-4 w-4 text-blue-400" />
            <span className="text-white font-medium">{config.rider.name}</span>
            <span className="text-yellow-400 text-sm">★ {config.rider.rating}</span>
          </div>
          <div className="text-xs text-gray-300">{config.rider.phone}</div>
        </div>

        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-green-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-400">Pickup</div>
              <div className="text-sm text-white">{config.rider.pickupLocation}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Navigation className="h-4 w-4 text-red-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-400">Drop-off</div>
              <div className="text-sm text-white">{config.rider.dropLocation}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-yellow-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-400">ETA</div>
              <div className="text-sm text-white">{config.rider.estimatedTime} • {config.rider.distance}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <CreditCard className="h-4 w-4 text-purple-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-400">Fare</div>
              <div className="text-sm text-white">{config.rider.fare} • {config.trip.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* Trip ID */}
        <div className="text-center pt-2 border-t border-gray-600">
          <div className="text-xs text-gray-400">Trip ID: {config.trip.tripId}</div>
        </div>
      </div>
    </div>
  );
};

export default RiderDetails;
