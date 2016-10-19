import { validate, validateSync } from './validator';

export function ValidationSchema(schema) {
  this.validate = validate.bind(this, schema);
  this.validateSync = validateSync.bind(this, schema);
}
