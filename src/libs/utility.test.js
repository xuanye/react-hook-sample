// example.test.js
import { describe, expect, test } from 'vitest';
import utility from './utility';

function wrapName(value) {
  return { name: value };
}

describe('formatTime', () => {
  test('format time', () => {
    expect(utility.formatTime(1)).toBe('00:00:01');
    expect(utility.formatTime(11)).toBe('00:00:11');
    expect(utility.formatTime(60)).toBe('00:01:00');
    expect(utility.formatTime(61)).toBe('00:01:01');
    expect(utility.formatTime(75)).toBe('00:01:15');
    expect(utility.formatTime(600)).toBe('00:10:00');
    expect(utility.formatTime(661)).toBe('00:11:01');
    expect(utility.formatTime(3600)).toBe('01:00:00');
    expect(utility.formatTime(3600 + 661)).toBe('01:11:01');
  });
});

describe('compare()', () => {
  test('Asc Compare', () => {
    expect(utility.ascCompare(wrapName('a'), wrapName('b'))).toBe(-1);
    expect(utility.ascCompare(wrapName('c'), wrapName('b'))).toBe(1);

    expect(utility.ascCompare(wrapName('A'), wrapName('b'))).toBe(-1);
    expect(utility.ascCompare(wrapName('c'), wrapName('B'))).toBe(1);

    expect(utility.ascCompare(wrapName('a'), wrapName(''))).toBe(-1);
    expect(utility.ascCompare(wrapName(''), wrapName('b'))).toBe(1);
  });

  test('Desc Compare', () => {
    expect(utility.descCompare(wrapName('a'), wrapName('b'))).toBe(1);
    expect(utility.descCompare(wrapName('c'), wrapName('b'))).toBe(-1);

    expect(utility.descCompare(wrapName('A'), wrapName('b'))).toBe(1);
    expect(utility.descCompare(wrapName('c'), wrapName('B'))).toBe(-1);

    expect(utility.descCompare(wrapName('a'), wrapName(''))).toBe(-1);
    expect(utility.descCompare(wrapName(''), wrapName('b'))).toBe(1);
  });
});

test('contains()', () => {
  const source = 'Abc@gg.com';
  expect(utility.contains(source, 'a')).toBeTruthy();
  expect(utility.contains(source, 'A')).toBeTruthy();
  expect(utility.contains(source, '.com')).toBeTruthy();
  expect(utility.contains(source, 'f')).toBeFalsy();
});
