import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import useAddress from '@/hooks/useAddress';

import classes from './index.module.css';

const addressList = ['', 'Shanghai', 'Chengdu', 'Beijing', 'Chongqing', 'Guangzhou'];
function AddressForm({ item, index }) {
  const { confirmEditItem, cancelSaveItem } = useAddress(model => [
    model.cancelSaveItem,
    model.confirmEditItem,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: item,
  });

  const onSubmit = data => {
    confirmEditItem(index, data);
  };
  const handleCancel = () => cancelSaveItem(item);

  return (
    <div className={classNames(classes.card)}>
      <form className='form-horizontal' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <div className='col-4 col-sm-12'>
            <label className='form-label' htmlFor='name'>
              Name:
            </label>
          </div>
          <div className='col-8 col-sm-12'>
            <input
              className={classNames('form-input', errors.name ? 'is-error' : null)}
              {...register('name', {
                required: { value: true, message: 'name is required!' },
                pattern: { value: /^[A-Za-z\d]+$/i, message: 'name is valid' },
              })}
            />
            {errors.name && <p className='form-input-hint'>{errors.name?.message}</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='col-4 col-sm-12'>
            <label className='form-label' htmlFor='address'>
              Location:
            </label>
          </div>
          <div className='col-8 col-sm-12'>
            <select
              className={classNames('form-select', errors.address ? 'is-error' : null)}
              {...register('address', { required: true })}
            >
              {addressList.map(address => {
                if (!address) {
                  return (
                    <option value='' key='please choose'>
                      Choose an option
                    </option>
                  );
                }
                return (
                  <option key={address} value={address}>
                    {address}
                  </option>
                );
              })}
            </select>
            {errors.address && <p className='form-input-hint'>please choose an option!</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='col-4 col-sm-12'>
            <label className='form-label' htmlFor='email'>
              Email:
            </label>
          </div>
          <div className='col-8 col-sm-12'>
            <input
              className={classNames('form-input', errors.email ? 'is-error' : null)}
              type='text'
              {...register('email', {
                required: { value: true, message: 'email is required!' },
                pattern: {
                  value: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i,
                  message: 'email is valid',
                },
              })}
            />
            {errors.email && <p className='form-input-hint'>{errors.email?.message}</p>}
          </div>
        </div>
        <div>
          <button
            className={classNames('btn', 'btn-primary', 'mx-1', 'my-2')}
            style={{ minWidth: '80px' }}
            type='submit'
          >
            Save
          </button>
          <button
            type='button'
            className={classNames('btn', 'btn-link', 'mx-1', 'my-2')}
            style={{ minWidth: '80px' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
