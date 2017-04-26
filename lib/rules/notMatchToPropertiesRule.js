import { isDefined, isArray } from '../utils';

/**
 *
 * @param value
 * @param notMatchToProperties
 * @param obj
 * @returns {*}
 */
export default function notMatchToPropertiesRule(value, notMatchToProperties, obj) {
  if (!isArray(notMatchToProperties)) {
    notMatchToProperties = [notMatchToProperties];
  }

  return notMatchToProperties.every(not => obj[not] !== value);
}
