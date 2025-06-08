import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="text-right">
      <div className="text-2xl font-mono font-bold text-sky-400">
        {formatTime(time)}
      </div>
      <div className="text-sm text-gray-400">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default ClockDisplay;
