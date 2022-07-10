import { useMemo, useState } from 'react';
import { createModel } from 'hox';
import { ItemState, SortType } from '@/config/constants';
import utility from '@/libs/utility';

const { ascCompare, descCompare, generateId } = utility;

const initialAddressList = [
  {
    id: '1',
    name: 'Tom',
    email: 'Tom@tiok.com',
    address: 'Shanghai',
    status: 0,
  },
  {
    id: '2',
    name: 'David',
    email: 'David@tiok.com',
    address: 'Beijing',
    status: 0,
  },
  {
    id: '3',
    name: 'Crown',
    email: 'Crown@tiok.com',
    address: 'Guangzhou',
    status: 0,
  },
  {
    id: '4',
    name: 'Aron',
    email: 'Aron@tiok.com',
    address: 'Chongqing',
    status: 0,
  },
];

const useAddress = () => {
  const [editMode, setEditMode] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [addressList, setAddressList] = useState(initialAddressList);

  const sortedList = useMemo(() => {
    switch (sortType) {
      case SortType.Asc:
        return [...addressList.sort(ascCompare)];
      case SortType.Desc:
        return [...addressList.sort(descCompare)];
      default:
        return addressList;
    }
  }, [sortType, addressList]);

  const startAddItem = data => {
    setEditMode(true);

    setAddressList(list => [
      ...list,
      data || {
        id: generateId(),
        name: '',
        email: '',
        address: '',
        status: 1,
      },
    ]);
  };
  const removeItem = index => {
    setAddressList(list => {
      list.splice(index, 1);
      return [...list];
    });
  };

  const startEditItem = index => {
    setEditMode(true);

    setAddressList(list =>
      list.map((item, i) => {
        item.status = i == index ? 2 : 0;
        return item;
      }),
    );
  };

  const confirmEditItem = (index, data) => {
    setAddressList(list =>
      list.map((item, i) => {
        item.status = ItemState.Default;
        if (i == index) {
          item.name = data.name;
          item.email = data.email;
          item.address = data.address;
        }
        return item;
      }),
    );
    setEditMode(false);
  };

  const cancelSaveItem = data => {
    if (data.status == ItemState.AddNew) {
      // 新增
      setAddressList(list => {
        list.splice(list.length - 1, 1);
        return [...list];
      });
    } else {
      setAddressList(list =>
        list.map(item => {
          item.status = 0;
          return item;
        }),
      );
    }
    setEditMode(false);
  };

  return {
    editMode,
    setSortType,
    addressList: sortedList,
    startAddItem,
    removeItem,
    startEditItem,
    cancelSaveItem,
    confirmEditItem,
  };
};

export default createModel(useAddress);
