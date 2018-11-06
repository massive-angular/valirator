import { isDefined, toString } from '../utils';

/**
 *
 * @param value
 * @param divisibleBy
 * @returns {boolean}
 */
export default function divisibleByRule(value, divisibleBy) {
  if (!isDefined(value)) {
    return true;
  }

  let multiplier = Math.max(
    toString(value - Math.floor(value)).length - 2,
    toString(divisibleBy - Math.floor(divisibleBy)).length - 2,
  );

  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

  return (value * multiplier) % (divisibleBy * multiplier) === 0;
}
