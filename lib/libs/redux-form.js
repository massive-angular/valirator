import { validate, validateSync } from '../core';

/**
 *
 * @param schema
 * @param allErrors
 * @returns {reduxFormValidatorFn}
 */
export function reduxFormValidator(schema, allErrors) {
  return function reduxFormValidatorFn(values) {
    const validationResult = validateSync(schema, values);

    return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
  }
}

/**
 *
 * @param schema
 * @param allErrors
 * @returns {reduxFormAsyncValidatorFn}
 */
export function reduxFormAsyncValidator(schema, allErrors) {
  return function reduxFormAsyncValidatorFn(values) {
    return validate(schema, values)
      .then(validationResult => {
        return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
      });
  }
}
