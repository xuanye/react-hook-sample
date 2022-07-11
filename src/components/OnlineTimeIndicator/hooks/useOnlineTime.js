import { useState, useEffect } from 'react';

export const useOnlineTime = () => {
  const [onlineTime, setOnlineTime] = useState(0);

  useEffect(() => {
    const ticker = setTimeout(() => {
      setOnlineTime(state => state + 1);
    }, 1000);

    return () => {
      clearTimeout(ticker);
    };
  });
  return { onlineTime };
};
