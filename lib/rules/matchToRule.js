import { isDefined } from '../utils';
import { registerRule } from '../storage';

export default function matchToRule(value, matchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value === matchTo;
}
