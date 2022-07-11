import React from 'react';
import classNames from 'classnames';
import Utility from '@/libs/utility';
import { useOnlineTime } from './hooks/useOnlineTime';

export const OnlineTimeIndicator = React.memo(() => {
  const { onlineTime } = useOnlineTime();
  return (
    <div className={classNames('text-center', 'cite', 'm-2')}>
      Online Time: <time>{Utility.formatTime(onlineTime)}</time>
    </div>
  );
});
OnlineTimeIndicator.displayName = 'OnlineTimeIndicator';
