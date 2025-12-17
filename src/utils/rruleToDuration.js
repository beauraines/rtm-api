'use strict';

/**
 * Convert an RTM-style rrule object into an ISO 8601 duration string.
 * @param {{ $t: string }} rrule - Object with $t property like 'FREQ=DAILY;INTERVAL=1;WKST=SU'
 * @returns {string} ISO 8601 duration string (e.g. 'P1D', 'PT3H')
 * @throws {Error} on missing or unsupported frequency
 */
function rruleToISODuration(rrule) {
  if (!rrule || typeof rrule.$t !== 'string') {
    throw new Error('Invalid rrule object');
  }

  const parts = rrule.$t
    .split(';')
    .map(p => p.split('='))
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});

  const freq = parts.FREQ;
  const interval = parseInt(parts.INTERVAL || '1', 10);
  const freqMap = {
    YEARLY: 'Y',
    MONTHLY: 'M',
    WEEKLY: 'W',
    DAILY: 'D',
    HOURLY: 'H',
    MINUTELY: 'M',
    SECONDLY: 'S',
  };

  const designator = freqMap[freq];
  if (!designator) {
    throw new Error(`Unsupported FREQ: ${freq}`);
  }

  const timeBased = ['HOURLY', 'MINUTELY', 'SECONDLY'].includes(freq);
  return `${timeBased ? 'PT' : 'P'}${interval}${designator}`;
}

module.exports = rruleToISODuration;
