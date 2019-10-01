import { isString, isObject, isDefined, getPrototypeOf } from './utils';

/**
 * @typedef ValidationResult
 * @property {boolean} isValid - check if validation result has not errors
 * @property {boolean} hasErrors - check if validation result has errors
 * @property {boolean} hasErrorsOfTypes - check if validation result has errors of specific types
 * @property {*} getErrors - get validation result errors
 * @property {*} getFirstErrors - get first validation result errors
 * @property {Array<*>} getErrorsAsArray - get validation result errors as array
 * @property {string} getFirstError - get first validation result error
 *
 * ValidationResult is util class that contain information about errors and any level
 *
 * @param {Object} errors - validation errors
 * @returns {ValidationResult}
 */
export default function ValidationResult(errors = {}) {
  const protoOfErrors = getPrototypeOf(errors);
  const that = {
    ...protoOfErrors,
    ...errors,
  };
  const keys = [...Object.keys(errors), ...Object.keys(protoOfErrors)];

  Object.defineProperties(that, {
    isValid: {
      value: function isValid() {
        return !this.hasErrors();
      },
    },
    hasErrors: {
      value: function hasErrors() {
        return keys.some(key => {
          if (that[key].hasErrors) {
            return that[key].hasErrors();
          }

          return that[key];
        });
      },
    },
    hasErrorsOfTypes: {
      value: function hasErrorsOfTypes(...types) {
        return keys.some(key => {
          if (types.indexOf(key) !== -1) {
            return true;
          }

          if (that[key].hasErrorsOfTypes) {
            return that[key].hasErrorsOfTypes(...types);
          }

          return false;
        });
      },
    },
    getErrors: {
      value: function getErrors(includeEmptyErrors) {
        return keys.reduce((result, key) => {
          const subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

          if (Object.keys(subErrors).length || includeEmptyErrors) {
            return {
              ...result,
              [key]: subErrors,
            };
          }

          return result;
        }, {});
      },
    },
    getFirstErrors: {
      value: function getFirstErrors(includeEmptyErrors) {
        return keys.reduce((result, key, index) => {
          const subErrors = that[key].getFirstErrors ? that[key].getFirstErrors(includeEmptyErrors) : that[key];

          if (!isString(result) && isObject(that[key]) && (Object.keys(subErrors).length || includeEmptyErrors)) {
            return {
              ...result,
              [key]: subErrors,
            };
          }

          return index === 0 ? subErrors : result;
        }, {});
      },
    },
    getErrorsAsArray: {
      value: function getErrorsAsArray(includeEmptyErrors) {
        return keys
          .map(key => {
            const subErrors = that[key].getErrorsAsArray ? that[key].getErrorsAsArray(includeEmptyErrors) : that[key];

            if (subErrors.length || includeEmptyErrors) {
              return subErrors;
            }

            return null;
          }, {})
          .filter(error => isDefined(error));
      },
    },
    getFirstError: {
      value: function getFirstError(...exclude) {
        return (this.getErrorsAsArray(exclude) || [])[0];
      },
    },
  });

  return that;
}
