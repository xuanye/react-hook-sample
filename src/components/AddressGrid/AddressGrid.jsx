import React from 'react';

import classNames from 'classnames';
import useAddress from '@/hooks/useAddress';
import useFilterText from '@/hooks/useFilterText';
import utility from '@/libs/utility';
import AddressItem from './AddressItem';
import AddressForm from './AddressForm';

import classes from './index.module.css';

const { contains } = utility;

export function AddressGrid() {
  const { addressList } = useAddress(model => [model.addressList]);
  const { filterText } = useFilterText(model => [model.filterText]);

  const itemList = addressList.map((item, i) => {
    let show = true;
    if (filterText) {
      show =
        contains(item.name, filterText) ||
        contains(item.email, filterText) ||
        contains(item.address, filterText);
    }
    if (!show) {
      return null;
    }

    if (item.status === 0) {
      return <AddressItem key={item.id} item={item} index={i} markText={filterText} />;
    }
    return <AddressForm key={item.id} item={item} index={i} />;
  });

  return <div className={classNames(classes.cards, 'm-2', 'p-2')}>{itemList}</div>;
}
