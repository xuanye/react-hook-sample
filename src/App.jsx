import React from 'react';
import OnlineTimeIndicator from '@/components/OnlineTimeIndicator';
//import Toolbar from '@/components/Toolbar';
//import AddressGrid from '@/components/AddressGrid';

import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.app}>
      <h1 className={classes.title}>Address Book</h1>
      <OnlineTimeIndicator />
      {/*
       <Toolbar />
      <AddressGrid />
*/}
    </div>
  );
};

export default App;
