import { isObject, getPrototypeOf } from './utils';

export function ValidationResult(errors = {}) {
  const that = {
    ...getPrototypeOf(errors),
    ...errors,
  };

  Object.defineProperties(that, {
    isValid: {
      value: function isValid() {
        return !this.hasErrors();
      },
    },
    hasErrors: {
      value: function hasErrors() {
        const keys = Object.keys(that);

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
        const keys = Object.keys(that);

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
        const keys = Object.keys(that);

        return keys.reduce((result, key) => {
          const subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

          if (Object.keys(subErrors).length || includeEmptyErrors) {
            return {
              ...result,
              [key]: (subErrors),
            };
          }

          return result;
        }, {});
      },
    },
    getFirstErrors: {
      value: function getFirstErrors(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys.reduce((result, key, index) => {
          const subErrors = that[key].getFirstErrors ? that[key].getFirstErrors(includeEmptyErrors) : that[key];

          if (isObject(that[key]) && (Object.keys(subErrors).length || includeEmptyErrors)) {
            return {
              ...result,
              [key]: (subErrors),
            };
          }

          return index === 0 ? subErrors : result;
        }, {});
      }
    },
    getErrorsAsArray: {
      value: function getErrorsAsArray(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys.map((key) => {
          const subErrors = that[key].getErrorsAsArray ? that[key].getErrorsAsArray(includeEmptyErrors) : that[key];

          if (subErrors.length || includeEmptyErrors) {
            return subErrors;
          }

          return null;
        }, {}).filter(error => !!error);
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
