import { isDefined, inArray } from '../utils';

export default function enumRule(value, e) {
  if (!isDefined(value)) {
    return true;
  }

  return inArray(e, value);
}
