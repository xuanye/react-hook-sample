import React, { useState } from 'react';
import classes from './index.module.css';
import classNames from 'classnames';
import { MarkText } from '../MarkText';

const AddressItem = ({ item, markText, index }) => {
  const { name, address, email } = item;
  const firstLetter = name[0].toUpperCase();
  const handleEdit = () => {};
  const handleRemove = () => {};
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
          onClick={handleEdit}>
          Edit
        </button>
        <button
          className={classNames('btn', 'mx-1', 'my-2')}
          style={{ minWidth: '80px' }}
          onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default AddressItem;
