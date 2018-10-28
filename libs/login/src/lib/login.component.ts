import { Component } from '@angular/core';
import { environment } from '@kubic/env/web';
import { ClrLoadingState } from '@clr/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthLogin } from '@kubic/auth';
import { Router } from '@angular/router';
import { ApolloError } from 'apollo-client';
import { CoreService } from '@kubic/core';

@Component({
  selector: 'kubic-home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    rememberMe: new FormControl(true),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  loginBtnState = ClrLoadingState.DEFAULT;
  title = environment.app.name;

  constructor(
    private readonly core: CoreService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  private async handleLoginSuccess() {
    this.loginBtnState = ClrLoadingState.SUCCESS;

    await this.router.navigate(['/dashboard']);
  }

  private handleLoginError(err: ApolloError) {
    this.loginBtnState = ClrLoadingState.ERROR;

    this.core.handleFormValidationErrors(this.loginForm, err);
  }

  onSubmit() {
    this.loginBtnState = ClrLoadingState.LOADING;
    const action = new AuthLogin(this.loginForm.value);

    this.store.dispatch(action).subscribe(
      () => this.handleLoginSuccess(),
      (err) => this.handleLoginError(err),
    );
  }
}
