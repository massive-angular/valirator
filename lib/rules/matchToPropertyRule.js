import { isDefined } from '../utils';

export default function matchToPropertyRule(value, matchToProperty, obj) {
  if (!isDefined(value)) {
    return true;
  }

  return value === obj[matchToProperty];
}
