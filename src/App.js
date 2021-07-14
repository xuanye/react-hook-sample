import React from 'react';
import './index.less';
import OnlineTimeIndicator from './OnlineTimeIndicator';
import Toolbar from './Toolbar';
import AddressGrid from './AddressGrid';
const App = () => {
    return (
        <div className='app'>
            <h1 style={{ textAlign: 'center' }}>Address Book</h1>
            <OnlineTimeIndicator />
            <Toolbar />
            <AddressGrid />
        </div>
    );
};

export default App;
