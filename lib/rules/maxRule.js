import { isDefined } from '../utils';

export default function maxRule(value, max) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}
