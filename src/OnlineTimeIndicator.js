import React, { useState, useEffect } from 'react';
import Utility from './utility';

const OnlineTimeIndicator = () => {
    const [onlineTime, setOnlineTime] = useState(0);

    useEffect(() => {
        const ticker = setTimeout(() => {
            setOnlineTime(onlineTime + 1);
        }, 1000);

        return () => {
            clearTimeout(ticker);
        };
    });

    const style = { textAlign: 'center' };
    return <div style={style}>Online Time：{Utility.formatTime(onlineTime)}</div>;
};

export default OnlineTimeIndicator;
