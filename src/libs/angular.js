import { validate, validateSync } from '../core';

export function ngValidator(schema) {
  return function validatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return validationResult.getErrors();
  }
}

export function ngAsyncValidator(schema) {
  return function asyncValidatorFn(control) {
    return validate(schema, control.value)
      .then(validationResult => {
        return validationResult.getErrors();
      });
  }
}
