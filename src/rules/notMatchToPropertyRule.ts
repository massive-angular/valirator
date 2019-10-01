import { castArray } from '../utils';

/**
 *
 * @param value
 * @param notMatchToProperty
 * @param obj
 * @returns {*}
 */
export default function notMatchToPropertyRule(value, notMatchToProperty, obj) {
  return castArray(notMatchToProperty).every(not => obj[not] !== value);
}

notMatchToPropertyRule.ruleName = ['notMatchToProperty', 'notMatchToProperties'];
notMatchToPropertyRule.defaultMessage = 'should not match to %{expected}';
