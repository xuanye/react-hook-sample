import React from 'react';
import { OnlineTimeIndicator } from '@/components/OnlineTimeIndicator';
import { Toolbar } from '@/components/Toolbar';
import { AddressGrid } from '@/components/AddressGrid';
import classNames from 'classnames';

const App = () => {
  return (
    <div className={classNames('p-centered', 'text-center')}>
      <h1>Address Book</h1>
      <OnlineTimeIndicator />
      <Toolbar />
      <AddressGrid />
    </div>
  );
};

export default App;
