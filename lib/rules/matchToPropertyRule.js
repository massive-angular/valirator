import { castArray } from '../utils';

/**
 *
 * @param value
 * @param matchToProperty
 * @param obj
 * @returns {boolean}
 */
export default function matchToPropertyRule(value, matchToProperty, obj) {
  return castArray(matchToProperty).every(to => obj[to] === value);
}

matchToPropertyRule.ruleName = ['matchToProperty', 'matchToProperties'];
matchToPropertyRule.defaultMessage = 'should match to %{expected}';
