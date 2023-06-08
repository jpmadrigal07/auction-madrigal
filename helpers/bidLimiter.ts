import { get, set } from 'lodash';
import { NextRequest } from 'next/server';

const bidLimiterState = {};

const bidLimiter = (userId: number, itemId: number) => {
  const bidLimit = 1, seconds = 5;
  const key = String(`${userId}-${itemId}`);

  const now = Date.now();
  const windowStart = now - seconds * 1000;

  const requestTimestamps: (string | number)[] = get(bidLimiterState, key, []).filter((timestamp) => timestamp > windowStart);
  requestTimestamps.push(now);

  set(bidLimiterState, key, requestTimestamps);

  return requestTimestamps.length <= bidLimit;
};

export default bidLimiter;