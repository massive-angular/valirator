import { validate, validateSync } from '../core';

/**
 *
 * @param schema
 * @param onlyFirstErrors
 * @returns {ngValidatorFn}
 */
export function ngValidator(schema, onlyFirstErrors) {
  return function ngValidatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
  };
}

/**
 *
 * @param schema
 * @param onlyFirstErrors
 * @returns {ngAsyncValidatorFn}
 */
export function ngAsyncValidator(schema, onlyFirstErrors) {
  return function ngAsyncValidatorFn(control) {
    return validate(schema, control.value).then(validationResult => {
      return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
    });
  };
}
