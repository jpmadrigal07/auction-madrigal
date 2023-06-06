import { get, set } from 'lodash';
import { headers } from 'next/headers';

const rateLimiter = {};

const rateLimiterMiddleware = (rateLimit = 10, minute = 1) => {
  const headersList = headers();
  const splitForwardedFor = headersList.get('x-forwarded-for')?.split(",");
  const ip = splitForwardedFor![0];

  const now = Date.now();
  const windowStart = now - 60 * ( 1000 * minute );

  const requestTimestamps: (string | number)[] = get(rateLimiter, ip, []).filter((timestamp) => timestamp > windowStart);
  requestTimestamps.push(now);

  set(rateLimiter, ip, requestTimestamps);

  return requestTimestamps.length <= rateLimit;
};

export default rateLimiterMiddleware;