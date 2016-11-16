import { isDefined, isString } from '../utils';

export default function patternRule(value, pattern) {
  if (!isDefined(value)) {
    return true;
  }

  pattern = isString(pattern)
    ? new RegExp(pattern)
    : pattern;

  return pattern.test(value);
}
