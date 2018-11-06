/**
 *
 * @param value
 * @param moreThan
 * @returns {boolean}
 */
export default function moreThanRule(value, moreThan) {
  return value > moreThan;
}

moreThanRule.ruleName = 'moreThan';
moreThanRule.defaultMessage = 'must be greater than %{expected}';
