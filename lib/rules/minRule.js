import { isDefined } from '../utils';

export default function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}
