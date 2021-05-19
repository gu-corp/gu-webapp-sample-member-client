import { validate } from 'class-validator';
import { i18n } from 'next-i18next'

export async function validateObject(object) {
  const errors = await validate(object);
  const resultErrors = {};
  // errors is an array of validation errors
  if (errors.length > 0) {    
    errors.forEach(error => {
      const keys = Object.keys(error.constraints);
      const errorString = keys[0];
      resultErrors[error.property] = i18n.t(error.constraints[errorString]);
    })                       
  } 
  return resultErrors;
}