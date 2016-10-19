export function ValidationResult(errors = {}) {
  const that = {
    ...errors.__proto__,
    ...errors,
  };

  Object.defineProperties(that, {
    _invokeActionFor: {
      value: function _invokeActionFor(property, action, ...args) {
        return errors[property] && errors[property][action] && errors[property][action](...args);
      }
    },
    isValid: {
      value: function isValid() {
        return !this.hasErrors();
      },
    },
    hasErrors: {
      value: function hasErrors() {
        const keys = Object.keys(that);

        return keys.some(key => {
          if (errors[key].hasErrors) {
            return errors[key].hasErrors();
          }

          return errors[key];
        });
      },
    },
    hasErrorsFor: {
      value: function hasErrorsFor(property) {
        return this._invokeActionFor(property, 'hasErrors');
      },
    },
    hasErrorsOfTypes: {
      value: function hasErrorsOfTypes(...types) {
        const keys = Object.keys(that);

        return keys.some(key => {
          if (types.indexOf(key) !== -1) {
            return true;
          }

          if (errors[key].hasErrorsOfTypes) {
            return errors[key].hasErrorsOfTypes(...types);
          }

          return false;
        });
      },
    },
    hasErrorsOfTypesFor: {
      value: function hasErrorsOfTypesFor(property, ...types) {
        return this._invokeActionFor(property, 'hasErrorsOfTypes', ...types);
      },
    },
    getErrors: {
      value: function getErrors(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys.reduce((result, key) => {
          const subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

          if (Object.keys(subErrors).length > 0 || includeEmptyErrors) {
            return {
              ...result,
              [key]: (subErrors),
            };
          }

          return result;
        }, {})
      },
    },
    getErrorsFor: {
      value: function getErrorsFor(property) {
        return this._invokeActionFor(property, 'getErrors');
      },
    },
    getErrorsAsArray: {
      value: function getErrorsAsArray(...exclude) {
        return Object
          .keys(that)
          .filter(key => exclude.indexOf(key) === -1)
          .map(key => that[key]);
      },
    },
    getErrorsAsArrayFor: {
      value: function getErrorsAsArrayFor(property, ...exclude) {
        return this._invokeActionFor(property, 'getErrorsAsArray', ...exclude);
      },
    },
    getFirstError: {
      value: function getFirstError(...exclude) {
        return (this.getErrorsAsArray(exclude) || [])[0];
      },
    },
    getFirstErrorFor: {
      value: function getFirstErrorFor(property, ...exclude) {
        return (this.getErrorsAsArrayFor(property, ...exclude) || [])[0];
      },
    },
  });

  return that;
}
