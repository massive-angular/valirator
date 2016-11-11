import { validate, validateSync } from '../core';

export function ngFormValidator(schema) {
  return function validatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return validationResult.getFirstErrors();
  }
}

export function ngFormAsyncValidator(schema) {
  return function asyncValidatorFn(control) {
    return validate(schema, control.value)
      .then(validationResult => {
        return validationResult.getFirstErrors();
      });
  }
}
