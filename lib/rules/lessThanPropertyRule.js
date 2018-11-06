/**
 *
 * @param value
 * @param lessThanProperty
 * @param obj
 * @returns {boolean}
 */
export default function lessThanPropertyRule(value, lessThanProperty, obj) {
  return value < obj[lessThanProperty];
}

lessThanPropertyRule.ruleName = 'lessThanProperty';
lessThanPropertyRule.defaultMessage = 'must be less than %{expected}';
