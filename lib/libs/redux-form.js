import { validate, validateSync } from '../core';

export function reduxFormValidator(schema, allErrors) {
  return function validatorFn(values) {
    const validationResult = validateSync(schema, values);

    return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
  }
}

export function reduxFormAsyncValidator(schema, allErrors) {
  return function asyncValidatorFn(values) {
    return validate(schema, values)
      .then(validationResult => {
        return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
      });
  }
}
