import { get, set } from 'lodash';
import { headers } from 'next/headers';

const rateLimiter = {};

const rateLimiterMiddleware = (rateLimit = 10, seconds = 60) => {
  const headersList = headers();
  const splitForwardedFor = headersList.get('x-forwarded-for')?.split(",");
  const ip = splitForwardedFor![0];

  const now = Date.now();
  const windowStart = now - seconds * 1000;

  const requestTimestamps: (string | number)[] = get(rateLimiter, ip, []).filter((timestamp) => timestamp > windowStart);
  requestTimestamps.push(now);

  set(rateLimiter, ip, requestTimestamps);

  return requestTimestamps.length <= rateLimit;
};

export default rateLimiterMiddleware;