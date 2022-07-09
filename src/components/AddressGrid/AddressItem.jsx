import React, { useCallback, useState } from 'react';
import classes from './index.module.css';
import classNames from 'classnames';
import { MarkText } from '../MarkText';
import useAddress from '@/hooks/useAddress';

const AddressItem = ({ item, markText, index }) => {
  const { startEditItem, removeItem, editMode } = useAddress(model => [
    model.startEditItem,
    model.removeItem,
    model.editMode,
  ]);
  const { name, address, email } = item;
  const firstLetter = name[0].toUpperCase();

  const handleEdit = useCallback(() => {
    startEditItem(index);
  }, [startEditItem, index]);

  const handleRemove = useCallback(() => {
    if (confirm('confirm remove this item?')) removeItem(index);
  }, [removeItem, index]);

  return (
    <div className={classNames(classes.card)}>
      <div>
        <div className={classNames(classes.cardBody)}>
          <div className={classNames(classes.cardLeft)}>
            <figure
              className={classNames('avatar', 'avatar-lg')}
              data-initial={firstLetter}></figure>
          </div>

          <div className={classNames('text-left', classes.cardContent)}>
            <MarkText originalText={name} markText={markText}></MarkText>
            <MarkText originalText={address} markText={markText}></MarkText>
            <MarkText originalText={email} markText={markText}></MarkText>
          </div>
        </div>
      </div>
      <div>
        <button
          className={classNames('btn', 'mx-1', 'my-2')}
          style={{ minWidth: '80px' }}
          disabled={editMode}
          onClick={handleEdit}>
          Edit
        </button>
        <button
          className={classNames('btn', 'btn-link', 'mx-1', 'my-2')}
          style={{ minWidth: '80px' }}
          disabled={editMode}
          onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default AddressItem;
