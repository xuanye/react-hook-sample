import React from 'react';
import classNames from 'classnames';
import { OnlineTimeIndicator } from '@/components/OnlineTimeIndicator';
import { Toolbar } from '@/components/Toolbar';
import { AddressGrid } from '@/components/AddressGrid';

function App() {
  return (
    <div className={classNames('p-centered', 'text-center')}>
      <h1>Address Book</h1>
      <OnlineTimeIndicator />
      <Toolbar />
      <AddressGrid />
    </div>
  );
}

export default App;
