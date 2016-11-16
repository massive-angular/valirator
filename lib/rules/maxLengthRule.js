import { isDefined } from '../utils';

export default function maxLengthRule(value, maxLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}
