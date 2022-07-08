import React from 'react';
import Utility from '@/libs/utility';
import { useOnlineTime } from '@/hooks/useOnlineTime';

import classes from './OnlineTimeIndicator.module.css';

export const OnlineTimeIndicator = () => {
  const { onlineTime } = useOnlineTime();
  return (
    <div className={classes.onlineTimeIndicator}>Online Time: {Utility.formatTime(onlineTime)}</div>
  );
};
