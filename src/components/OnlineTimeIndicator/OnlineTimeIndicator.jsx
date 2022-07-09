import React from 'react';
import Utility from '@/libs/utility';
import { useOnlineTime } from '@/hooks/useOnlineTime';
import classNames from 'classnames';

export const OnlineTimeIndicator = React.memo(() => {
  const { onlineTime } = useOnlineTime();
  return (
    <div className={classNames('text-center', 'cite', 'm-2')}>
      Online Time: <span className='time'>{Utility.formatTime(onlineTime)}</span>
    </div>
  );
});
