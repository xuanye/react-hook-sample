import { useState } from 'react';

export const useOnlineTime = () => {
  const [onlineTime, setOnlineTime] = useState(0);

  useEffect(() => {
    const ticker = setTimeout(() => {
      setOnlineTime(onlineTime + 1);
    }, 1000);

    return () => {
      clearTimeout(ticker);
    };
  });
  return { onlineTime };
};
