/**
 *
 * @param value
 * @param matchTo
 * @returns {boolean}
 */
export default function matchToRule(value, matchTo) {
  return value === matchTo;
}

matchToRule.ruleName = 'matchTo';
matchToRule.defaultMessage = 'should match to %{expected}';
