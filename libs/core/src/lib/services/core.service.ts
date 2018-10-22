import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApolloError } from 'apollo-client';

@Injectable()
export class CoreService {
  public handleFormValidationErrors(form: FormGroup, err: ApolloError) {
    const errors = err.graphQLErrors.reduce((errors, { extensions }) => ({
      ...errors,
      ...extensions.exception.validationErrors,
    }), {});

    Object.keys(errors).forEach(name => {
      form.controls[name].setErrors({
        unknown: errors[name],
      });
    });

    return errors;
  }
}
