import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function ActionButtons({ editMode, startAddItem, setSortType }) {
  const handlerAscSort = () => {
    setSortType(1);
  };
  const handlerDescSort = () => {
    setSortType(2);
  };
  return (
    <div className={classNames('column', 'col-6', 'text-right')}>
      <button
        type='button'
        className={classNames('btn', 'mx-1')}
        disabled={editMode}
        onClick={() => startAddItem()}
      >
        Add New
      </button>

      <button
        type='button'
        className={classNames('btn', 'mx-1')}
        disabled={editMode}
        onClick={handlerAscSort}
      >
        A-Z ↑
      </button>
      <button
        type='button'
        className={classNames('btn', 'mx-1')}
        disabled={editMode}
        onClick={handlerDescSort}
      >
        Z-A ↓
      </button>
    </div>
  );
}

ActionButtons.propTypes = {
  editMode: PropTypes.bool.isRequired,
  startAddItem: PropTypes.func.isRequired,
  setSortType: PropTypes.func.isRequired,
};

export default ActionButtons;
