import React, { useEffect } from 'react';

import classNames from 'classnames';
import useAddress from '@/hooks/useAddress';
import useFilterText from '@/hooks/useFilterText';

export const Toolbar = () => {
  const { startAddItem, setSortType, editMode } = useAddress(model => [
    model.startAddItem,
    model.setSortType,
    model.editMode,
  ]);
  const { filterText, setFilterText } = useFilterText();

  useEffect(() => {
    if (editMode) {
      setFilterText('');
    }
  }, [setFilterText, editMode]);
  const handlerAscSort = () => {
    setSortType(1);
  };
  const handlerDescSort = () => {
    setSortType(2);
  };
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
            value={filterText}
            onChange={e => {
              setFilterText(e.target.value || '');
            }}
            disabled={editMode}
            placeholder='Filter text'
          />
        </div>
      </div>
    </div>
  );
};
