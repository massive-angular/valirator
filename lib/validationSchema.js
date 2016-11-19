import { validate, validateSync, validateProperty, validatePropertySync } from './core';

/**
 * ValidationSchema is util class that
 *
 * @param {Object} schema -
 * @constructor
 */
export default function ValidationSchema(schema) {
  this._schema = schema;

  this.validate = (obj) => validate(schema, obj);
  this.validateSync = (obj) => validateSync(schema, obj);
  this.validateProperty = (property, obj) => validateProperty(property, obj, schema);
  this.validatePropertySync = (property, obj) => validatePropertySync(property, obj);
}
