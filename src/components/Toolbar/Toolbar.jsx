import React, { useCallback } from 'react';

import classNames from 'classnames';
import useAddress from '@/hooks/useAddress';

export const Toolbar = () => {
  const { startAddItem, setSortType, editMode } = useAddress(model => [
    model.startAddItem,
    model.setSortType,
    model.editMode,
  ]);

  const handlerAscSort = useCallback(() => {
    setSortType(1);
  }, [setSortType]);
  const handlerDescSort = useCallback(() => {
    setSortType(2);
  }, [setSortType]);
  return (
    <div className='container'>
      <div className={classNames('columns')}>
        <div className={classNames('column', 'col-6', 'text-right')}>
          <button
            className={classNames('btn', 'mx-1')}
            disabled={editMode}
            onClick={() => startAddItem()}>
            Add New
          </button>
          <button
            className={classNames('btn', 'mx-1')}
            disabled={editMode}
            onClick={handlerAscSort}>
            A-Z ↑
          </button>
          <button
            className={classNames('btn', 'mx-1')}
            disabled={editMode}
            onClick={handlerDescSort}>
            Z-A ↓
          </button>
        </div>
        <div className={classNames('column', 'col-6')}>
          <input
            className={classNames('form-input')}
            style={{ maxWidth: '300px' }}
            type='text'
            disabled={editMode}
            placeholder='filter'
          />
        </div>
      </div>
    </div>
  );
};
