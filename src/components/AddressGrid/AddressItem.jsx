import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useAddress from '@/hooks/useAddress';
import classes from './index.module.css';
import { MarkText } from '../MarkText';

function AddressItem({ item, markText, index }) {
  const { startEditItem, removeItem, editMode } = useAddress((model) => [
    model.startEditItem,
    model.removeItem,
    model.editMode,
  ]);
  const { name, address, email } = item;
  const firstLetter = name[0].toUpperCase();

  const handleEdit = () => {
    startEditItem(index);
  };

  const handleRemove = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('confirm remove this item?')) removeItem(index);
  };

  return (
    <div className={classNames(classes.card)}>
      <div>
        <div className={classNames(classes.cardBody)}>
          <div className={classNames(classes.cardLeft)}>
            <figure className={classNames('avatar', 'avatar-lg')} data-initial={firstLetter} />
          </div>

          <div className={classNames('text-left', classes.cardContent)}>
            <MarkText originalText={name} markText={markText} />
            <MarkText originalText={address} markText={markText} />
            <MarkText originalText={email} markText={markText} />
          </div>
        </div>
      </div>
      <div>
        <button
          type='button'
          className={classNames('btn', 'mx-1', 'my-2')}
          style={{ minWidth: '80px' }}
          disabled={editMode}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type='button'
          className={classNames('btn', 'btn-link', 'mx-1', 'my-2')}
          style={{ minWidth: '80px' }}
          disabled={editMode}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

AddressItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  markText: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default AddressItem;
