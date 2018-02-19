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
