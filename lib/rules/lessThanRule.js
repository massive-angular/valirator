/**
 *
 * @param value
 * @param lessThan
 * @returns {boolean}
 */
export default function lessThanRule(value, lessThan) {
  return value < lessThan;
}

lessThanRule.ruleName = 'lessThan';
lessThanRule.defaultMessage = 'must be less than %{expected}';
