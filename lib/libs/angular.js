import { validate, validateSync } from '../core';

export function ngValidator(schema, onlyFirstErrors) {
  return function validatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
  }
}

export function ngAsyncValidator(schema, onlyFirstErrors) {
  return function asyncValidatorFn(control) {
    return validate(schema, control.value)
      .then(validationResult => {
        return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
      });
  }
}
