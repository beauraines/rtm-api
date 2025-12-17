'use strict';

const rruleToISODuration = require('./rruleToDuration');

describe('rruleToISODuration', () => {
  test('daily with explicit interval', () => {
    const rrule = { $t: 'FREQ=DAILY;INTERVAL=1;WKST=SU' };
    expect(rruleToISODuration(rrule)).toBe('P1D');
  });

  test('weekly without interval (defaults to 1)', () => {
    const rrule = { $t: 'FREQ=WEEKLY;WKST=SU' };
    expect(rruleToISODuration(rrule)).toBe('P1W');
  });

  test('monthly with interval 2', () => {
    const rrule = { $t: 'FREQ=MONTHLY;INTERVAL=2' };
    expect(rruleToISODuration(rrule)).toBe('P2M');
  });

  test('hourly with interval 3', () => {
    const rrule = { $t: 'FREQ=HOURLY;INTERVAL=3' };
    expect(rruleToISODuration(rrule)).toBe('PT3H');
  });

  test('minutely with interval 15', () => {
    const rrule = { $t: 'FREQ=MINUTELY;INTERVAL=15' };
    expect(rruleToISODuration(rrule)).toBe('PT15M');
  });

  test('secondly with interval 30', () => {
    const rrule = { $t: 'FREQ=SECONDLY;INTERVAL=30' };
    expect(rruleToISODuration(rrule)).toBe('PT30S');
  });

  test('unsupported frequency throws', () => {
    const rrule = { $t: 'FREQ=UNKNOWN;INTERVAL=1' };
    expect(() => rruleToISODuration(rrule)).toThrow('Unsupported FREQ: UNKNOWN');
  });

  test('invalid object throws', () => {
    expect(() => rruleToISODuration(null)).toThrow('Invalid rrule object');
    expect(() => rruleToISODuration({})).toThrow('Invalid rrule object');
  });
});
