import React from 'react';
import classNames from 'classnames';
import useAddress from '@/hooks/useAddress';

import ActionButtons from './ActionButtons';
import FilterInput from './FilterInput';

export function Toolbar() {
  const { startAddItem, setSortType, editMode } = useAddress(model => [
    model.startAddItem,
    model.setSortType,
    model.editMode,
  ]);

  return (
    <div className='container'>
      <div className={classNames('columns')}>
        <ActionButtons setSortType={setSortType} editMode={editMode} startAddItem={startAddItem} />
        <FilterInput editMode={editMode} />
      </div>
    </div>
  );
}
