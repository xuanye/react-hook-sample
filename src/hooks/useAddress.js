import React, { useMemo, useState } from 'react';
import { SortType } from '@/config/constants';
import utility from '@/libs/utility';

const initialAddressList = [
  { name: 'Tom', email: 'Tom@tiok.com', address: 'Shanghai', status: 0 },
  { name: 'David', email: 'David@tiok.com', address: 'Beijing', status: 0 },
  { name: 'Crown', email: 'Crown@tiok.com', address: 'Guangzhou', status: 0 },
  { name: 'Aron', email: 'Aron@tiok.com', address: 'Chongqing', status: 0 },
];
export const useAddress = () => {
  const [sortType, setSortType] = useState(0);
  const [addressList, setAddressList] = useState(initialAddressList);

  const sortedList = useMemo(() => {
    switch (sortType) {
      case SortType.Asc:
        return addressList.sort(utility.ascCompare);
      case SortType.Desc:
        return addressList.sort(utility.descCompare);
      default:
        return addressList;
    }
  }, [sortType, addressList]);

  const startAddItem = data => {
    setAddressList([...addressList, data || { name: '', email: '', address: '', status: 1 }]);
  };
  const removeItem = index => {
    addressList.splice(index, 1);
    setAddressList([...addressList]);
  };

  const startEditItem = index => {
    const newList = addressList.map((item, i) => {
      item.status = i == index ? 2 : 0;
      return item;
    });
    setAddressList(newList);
  };

  const confirmEditItem = (index, data) => {
    const newList = addressList.map((item, i) => {
      item.status = 0;
      if (i == index) {
        item.name = data.name;
        item.email = data.email;
        item.address = data.address;
      }
      return item;
    });
    setAddressList(newList);
  };

  const cancelSaveItem = data => {
    if (data.status == 1) {
      addressList.splice(state.list.length - 1, 1);
      //新增
      setAddressList([...addressList]);
    } else {
      const newList = addressList.map((item, i) => {
        item.status = 0;
        return item;
      });
      setAddressList(newList);
    }
  };

  return {
    setSortType,
    addressList: sortedList,
    startAddItem,
    removeItem,
    startEditItem,
    cancelSaveItem,
  };
};
