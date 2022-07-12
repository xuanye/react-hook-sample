import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, test, beforeEach } from 'vitest';
import utility from '@/libs/utility';
import { ItemState, SortType } from '@/config/constants';

import useAddress, {
  initialAddressList,
  dispatchReducer,
  REMOVE_ITEM,
  ADD_ITEM,
  EDIT_ITEM,
  CANCEL_SAVE,
  SUBMIT_SAVE,
} from './useAddress';

const { generateId } = utility;

describe('dispatchReducer', () => {
  let addressList;
  beforeEach(() => {
    addressList = [...initialAddressList];
  });
  test('start add item', () => {
    const result = dispatchReducer(addressList, {
      type: ADD_ITEM,
      data: {
        id: generateId(),
        name: '',
        email: '',
        address: '',
        status: 1,
      },
    });
    expect(result).toHaveLength(5);

    expect(result[0].id).toBe(initialAddressList[0].id);

    expect(result[4].status).toBe(ItemState.AddNew);
  });

  test('remove item', () => {
    const result = dispatchReducer(addressList, {
      type: REMOVE_ITEM,
      index: 1,
    });

    expect(result.length).toBe(3);

    expect(result[0].id).toBe(initialAddressList[0].id);
    expect(result[1].id).toBe(initialAddressList[2].id);
  });

  test('start edit item', () => {
    const result = dispatchReducer(addressList, {
      type: EDIT_ITEM,
      index: 1,
    });

    expect(result).toHaveLength(4);
    expect(result[0].status).toBe(ItemState.Default);
    expect(result[1].status).toBe(ItemState.Editing);
  });

  test('cancel add item', () => {
    const addData = {
      id: generateId(),
      name: '',
      email: '',
      address: '',
      status: ItemState.AddNew,
    };
    const result = dispatchReducer(addressList, {
      type: ADD_ITEM,
      data: addData,
    });
    const addedData = result[result.length - 1];
    addedData.name = 'abc';
    const cancelResult = dispatchReducer(result, {
      type: CANCEL_SAVE,
      data: addedData,
    });

    expect(cancelResult).toHaveLength(4);
    for (let i = 0; i < 4; i += 1) {
      expect(cancelResult[i]).toEqual(initialAddressList[i]);
    }
  });

  test('cancel edit item', () => {
    const result = dispatchReducer(addressList, {
      type: EDIT_ITEM,
      index: 1,
    });
    const editIndex = 1;
    const editData = result[editIndex];
    const cancelResult = dispatchReducer(result, {
      type: CANCEL_SAVE,
      data: editData,
    });

    expect(cancelResult).toHaveLength(4);
    for (let i = 0; i < 4; i += 1) {
      expect(cancelResult[i]).toEqual(initialAddressList[i]);
    }
  });

  test('submit add item', () => {
    const addData = {
      id: generateId(),
      name: '',
      email: '',
      address: '',
      status: ItemState.AddNew,
    };
    const result = dispatchReducer(addressList, {
      type: ADD_ITEM,
      data: addData,
    });
    const addedData = result[result.length - 1];
    addedData.name = 'abc';
    addedData.email = 'abc@gmail.com';
    addedData.address = 'Shanghai';

    const submitResult = dispatchReducer(result, {
      type: SUBMIT_SAVE,
      index: result.length - 1,
      data: addedData,
    });

    expect(submitResult).toHaveLength(5);
    for (let i = 0; i < 4; i += 1) {
      expect(submitResult[i]).toEqual(addressList[i]);
    }
    expect(submitResult[4].id).toBe(addData.id);
    expect(submitResult[4].name).toBe('abc');
    expect(submitResult[4].email).toBe('abc@gmail.com');
    expect(submitResult[4].address).toBe('Shanghai');
    expect(submitResult[4].status).toBe(ItemState.Default);
  });

  test('submit edit item', () => {
    const result = dispatchReducer(addressList, {
      type: EDIT_ITEM,
      index: 1,
    });

    const editIndex = 1;
    const editData = result[editIndex];
    editData.name = 'abc';
    editData.email = 'abc@gmail.com';
    editData.address = 'Shanghai';

    const submitResult = dispatchReducer(result, {
      type: SUBMIT_SAVE,
      index: editIndex,
      data: editData,
    });

    expect(submitResult).toHaveLength(4);
    for (let i = 0; i < 4; i += 1) {
      if (i === 1) {
        expect(submitResult[i].id).toBe(initialAddressList[i].id);
        expect(submitResult[i].name).toBe('abc');
        expect(submitResult[i].email).toBe('abc@gmail.com');
        expect(submitResult[i].address).toBe('Shanghai');
        expect(submitResult[i].status).toBe(ItemState.Default);
      } else {
        expect(submitResult[i]).toEqual(initialAddressList[i]);
      }
    }
  });
});

describe('useAddress', () => {
  it('editMode should be correct value after call startAddItem and canSaveItem', () => {
    const { result } = renderHook(() => useAddress());
    expect(result.current.editMode).toBeFalsy();

    const tempData = {
      id: generateId(),
      name: '',
      email: '',
      address: '',
      status: 1,
    };
    act(() => result.current.startAddItem(tempData));

    expect(result.current.editMode).toBeTruthy();

    act(() => result.current.cancelSaveItem(tempData));

    expect(result.current.editMode).toBeFalsy();
  });

  it('editMode should be correct value after call startEditItem and canSaveItem', () => {
    const { result } = renderHook(() => useAddress());
    expect(result.current.editMode).toBeFalsy();

    const editIndex = 1;

    act(() => result.current.startEditItem(editIndex));

    expect(result.current.editMode).toBeTruthy();

    const tempData = result.current.addressList[editIndex];

    expect(tempData.status).toBe(ItemState.Editing);

    act(() => result.current.cancelSaveItem(tempData));

    expect(result.current.editMode).toBeFalsy();
  });

  it('editMode should be correct value after call startAddItem and confirmEditItem', () => {
    const { result } = renderHook(() => useAddress());
    expect(result.current.editMode).toBeFalsy();

    const tempData = {
      id: generateId(),
      name: 'xuanye',
      email: 'xuanye@gamil.com',
      address: 'Shanghai',
      status: 1,
    };
    act(() => result.current.startAddItem(tempData));

    expect(result.current.editMode).toBeTruthy();
    const lastIndex = result.current.addressList.length - 1;
    act(() => result.current.confirmEditItem(lastIndex, tempData));

    expect(result.current.editMode).toBeFalsy();
  });

  it('editMode should be correct value after call startEditItem and confirmEditItem', () => {
    const { result } = renderHook(() => useAddress());
    expect(result.current.editMode).toBeFalsy();

    const editIndex = 1;

    act(() => result.current.startEditItem(editIndex));

    expect(result.current.editMode).toBeTruthy();

    const tempData = result.current.addressList[editIndex];

    expect(tempData.status).toBe(ItemState.Editing);

    act(() => result.current.confirmEditItem(editIndex, tempData));

    expect(result.current.editMode).toBeFalsy();
  });

  it('addressList is a sorted list', () => {
    const { result } = renderHook(() => useAddress());

    act(() => result.current.setSortType(SortType.Asc));

    let [firstItem] = result.current.addressList;

    expect(firstItem.name).toBe('Aron');

    act(() => result.current.setSortType(SortType.Desc));

    [firstItem] = result.current.addressList;

    // global state : add by addItem
    expect(firstItem.name).toBe('xuanye');
  });
});
