
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, MapPin, Star, Phone, MessageCircle } from 'lucide-react';

const SwipeableRiderDetails = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const cards = [
    {
      title: 'RIDER INFO',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Sarah Chen</h4>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">4.9</span>
                <span className="text-xs text-gray-500">(127 rides)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Phone</span>
              <span className="text-white font-mono">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Member Since</span>
              <span className="text-white">Jan 2023</span>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>Message</span>
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'RIDER IMAGE',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="w-full h-48 bg-gray-700/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
              <span className="text-gray-400 text-sm">Rider Image</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>Verified rider photo</p>
            <p className="text-xs mt-1">Last updated: Today</p>
          </div>
        </div>
      )
    },
    {
      title: 'TRIP DETAILS',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-0.5 h-8 bg-gray-600 my-1"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-400">PICKUP</p>
                  <p className="text-sm text-white">123 Main Street</p>
                  <p className="text-xs text-gray-400">Downtown District</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400">DROP-OFF</p>
                  <p className="text-sm text-white">456 Oak Avenue</p>
                  <p className="text-xs text-gray-400">Business Center</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-cyan-400 font-bold">5.2 km</div>
              <div className="text-gray-400">Distance</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-green-400 font-bold">$18.50</div>
              <div className="text-gray-400">Fare</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'NAVIGATION',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-cyan-400">NEXT TURN</h4>
              <span className="text-xs text-gray-400">In 200m</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">→</span>
              </div>
              <div>
                <p className="text-white font-medium">Turn right</p>
                <p className="text-sm text-gray-400">onto Oak Street</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">ETA to Pickup</span>
              <span className="text-white font-mono">3 min</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Trip Time</span>
              <span className="text-white font-mono">18 min</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Traffic Status</span>
              <span className="text-green-400">Light</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Open Maps
          </button>
        </div>
      )
    }
  ];

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

export default SwipeableRiderDetails;
