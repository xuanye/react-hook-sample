import React from 'react';

import useAddress from '@/hooks/useAddress';
import AddressItem from './AddressItem';
import AddressForm from './AddressForm';

import classes from './index.module.css';
import classNames from 'classnames';

export const AddressGrid = () => {
  const { addressList } = useAddress(model => [model.addressList]);

  const itemList = addressList.map((item, i) => {
    /*
        let show = true;
        if ('') {
            show =
                item.name.indexOf(address.filterText) >= 0 ||
                item.email.indexOf(address.filterText) >= 0 ||
                item.address.indexOf(address.filterText) >= 0;
        }
        */
    if (item.status == 0) {
      return <AddressItem key={item.id} item={item} index={i} markText={''}></AddressItem>;
    } else {
      return <AddressForm key={item.id} item={item} index={i}></AddressForm>;
    }
  });

  return <div className={classNames(classes.cards, 'm-2', 'p-2')}>{itemList}</div>;
};
