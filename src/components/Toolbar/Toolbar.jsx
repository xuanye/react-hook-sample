import React from 'react';

import classNames from 'classnames';

export const Toolbar = () => {
  return (
    <div className='container'>
      <div className={classNames('columns')}>
        <div className={classNames('column', 'col-6', 'text-right')}>
          <button className={classNames('btn', 'mx-1')}>Add New</button>
          <button className={classNames('btn', 'mx-1')}>A-Z ↑</button>
          <button className={classNames('btn', 'mx-1')}>Z-A ↓</button>
        </div>
        <div className={classNames('column', 'col-6')}>
          <input
            className={classNames('form-input')}
            style={{ maxWidth: '300px' }}
            type='text'
            placeholder='filter'
          />
        </div>
      </div>
    </div>
  );
};
