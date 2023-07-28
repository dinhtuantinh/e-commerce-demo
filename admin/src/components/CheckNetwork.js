import React, { useState, useEffect } from 'react';

const CheckNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <h2>Đang trực tuyến</h2>
      ) : (
        <h2>Mất kết nối mạng</h2>
      )}
    </div>
  );
};

export default CheckNetwork;