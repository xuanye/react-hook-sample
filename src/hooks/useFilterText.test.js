import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import useFilterText from './useFilterText';

describe('useFilterText', () => {
  it('should be empty', () => {
    const { result } = renderHook(() => useFilterText());

    expect(result.current.filterText).toBe('');
  });

  it('should equal to a', () => {
    const { result } = renderHook(() => useFilterText());

    act(() => result.current.setFilterText('a'));

    expect(result.current.filterText).toBe('a');
  });

  // test global hook state
  it('should equal to b', () => {
    const { result } = renderHook(() => useFilterText());

    expect(result.current.filterText).toBe('a');

    act(() => result.current.setFilterText('b'));

    expect(result.current.filterText).toBe('b');
  });
});
