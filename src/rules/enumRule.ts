import { isDefined, inArray } from '../utils';

/**
 *
 * @param value
 * @param e
 * @returns {boolean}
 */
export default function enumRule(value, e) {
  if (!isDefined(value)) {
    return true;
  }

  return inArray(e, value);
}

enumRule.ruleName = 'enum';
enumRule.defaultMessage = 'must be present in given enumerator';
