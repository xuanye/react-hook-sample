import React from 'react';
import { create } from 'react-test-renderer';
import { describe, expect, test, vi, afterEach } from 'vitest';
import ActionButtons from './ActionButtons';

describe('ActionButtons', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('buttons should be disabled when editMode=true', () => {
    const mockStartAdd = vi.fn();
    const setSortType = vi.fn();
    const element = create(
      <ActionButtons editMode startAddItem={mockStartAdd} setSortType={setSortType} />
    );
    const buttons = element.root.findAllByType('button');
    buttons.forEach((btn) => {
      expect(btn.props.disabled).toBeTruthy();
    });
  });
  test('buttons should not be disabled when editMode=false', () => {
    const mockStartAdd = vi.fn();
    const setSortType = vi.fn();
    const element = create(
      <ActionButtons editMode={false} startAddItem={mockStartAdd} setSortType={setSortType} />
    );
    const buttons = element.root.findAllByType('button');
    buttons.forEach((btn) => {
      expect(btn.props.disabled).toBeFalsy();
    });
  });

  test('buttons onclick', () => {
    const mockStartAdd = vi.fn();
    const mockSetSortType = vi.fn();
    const element = create(
      <ActionButtons editMode={false} startAddItem={mockStartAdd} setSortType={mockSetSortType} />
    );
    const btnAdd = element.root.findByProps({ 'test-data-id': 'btnAdd' });
    const btnAsc = element.root.findByProps({ 'test-data-id': 'btnAsc' });
    const btnDesc = element.root.findByProps({ 'test-data-id': 'btnDesc' });

    btnAdd.props.onClick();
    expect(mockStartAdd).toHaveBeenCalled();

    btnAsc.props.onClick();
    expect(mockSetSortType).toHaveBeenCalled();
    expect(mockSetSortType).toBeCalledWith(1);

    btnDesc.props.onClick();
    expect(mockSetSortType).toBeCalledWith(2);
    expect(mockSetSortType).toBeCalledTimes(2);
  });
});
