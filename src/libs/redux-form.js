import { validate, validateSync } from '../core';

export function reduxFormValidator(schema, onlyFirstErrors) {
  return function validatorFn(values) {
    const validationResult = validateSync(schema, values);

    return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
  }
}

export function reduxFormAsyncValidator(schema, onlyFirstErrors) {
  return function asyncValidatorFn(values) {
    return validate(schema, values)
      .then(validationResult => {
        return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
      });
  }
}
