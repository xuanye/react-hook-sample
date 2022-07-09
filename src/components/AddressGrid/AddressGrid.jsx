import React, { useMemo } from 'react';

import useAddress from '@/hooks/useAddress';
import AddressItem from './AddressItem';
import AddressForm from './AddressForm';

import classes from './index.module.css';
import classNames from 'classnames';
import useFilterText from '@/hooks/useFilterText';

import utility from '@/libs/utility';

const { contains } = utility;

export const AddressGrid = () => {
  const { addressList } = useAddress(model => [model.addressList]);
  const { filterText } = useFilterText(model => [model.filterText]);

  const itemList = useMemo(() => {
    return addressList.map((item, i) => {
      /* */
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

      if (item.status == 0) {
        return (
          <AddressItem key={item.id} item={item} index={i} markText={filterText}></AddressItem>
        );
      } else {
        return <AddressForm key={item.id} item={item} index={i}></AddressForm>;
      }
    });
  }, [addressList, filterText]);

  return <div className={classNames(classes.cards, 'm-2', 'p-2')}>{itemList}</div>;
};
