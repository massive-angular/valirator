/**
 *
 * @param value
 * @param moreThanProperty
 * @param obj
 * @returns {boolean}
 */
export default function moreThanPropertyRule(value, moreThanProperty, obj) {
  return value > obj[moreThanProperty];
}

moreThanPropertyRule.ruleName = 'moreThanProperty';
moreThanPropertyRule.defaultMessage = 'must be greater than %{expected}';
