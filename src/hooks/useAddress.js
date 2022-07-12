import { useMemo, useState, useReducer } from 'react';
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
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const CANCEL_SAVE = 'CANCEL_SAVE';
const SUBMIT_SAVE = 'SUBMIT_SAVE';

const dispatchReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      state.splice(action.index, 1);
      return [...state];
    case ADD_ITEM:
      return [
        ...state,
        action.data || {
          id: generateId(),
          name: '',
          email: '',
          address: '',
          status: 1,
        },
      ];
    case EDIT_ITEM:
      return state.map((item, i) => {
        const ret = { ...item };
        ret.status = i === action.index ? 2 : 0;
        return ret;
      });
    case CANCEL_SAVE:
      if (action.data.status === ItemState.AddNew) {
        state.splice(state.length - 1, 1);
        return [...state];
      }
      return state.map((item) => {
        const ret = { ...item };
        ret.status = 0;
        return ret;
      });
    case SUBMIT_SAVE:
      return state.map((item, i) => {
        const ret = { ...item };
        ret.status = ItemState.Default;
        if (i === action.index) {
          ret.name = action.data.name;
          ret.email = action.data.email;
          ret.address = action.data.address;
        }
        return ret;
      });
    default:
      return state;
  }
};

const useAddress = () => {
  const [editMode, setEditMode] = useState(false);
  const [sortType, setSortType] = useState(0);

  const [addressList, dispatchAddress] = useReducer(dispatchReducer, initialAddressList);

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

  const startAddItem = (data) => {
    setEditMode(true);
    dispatchAddress({ type: ADD_ITEM, data });
  };
  const removeItem = (index) => {
    dispatchAddress({ type: REMOVE_ITEM, index });
  };

  const startEditItem = (index) => {
    dispatchAddress({ type: EDIT_ITEM, index });
    setEditMode(true);
  };

  const confirmEditItem = (index, data) => {
    dispatchAddress({ type: SUBMIT_SAVE, index, data });
    setEditMode(false);
  };

  const cancelSaveItem = (data) => {
    dispatchAddress({ type: CANCEL_SAVE, data });
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
