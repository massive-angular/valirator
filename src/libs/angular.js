import { validate, validateSync } from '../core';

export function angularValidator(schema) {
  return function ValidatorValidatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return validationResult.getFirstErrors();
  }
}

export function angularAsyncValidator(schema) {
  return function ValiratorAsyncValidatorFn(control) {
    return validate(schema, control.value)
      .then(validationResult => {
        return validationResult.getFirstErrors();
      });
  }
}
