import { Component } from '@angular/core';
import { environment } from '@env/web';
import { ClrLoadingState } from '@clr/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthPayload, loginMutation } from '@kubic/schemas';
import { AuthService } from '@kubic/auth';

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

  constructor(private readonly auth: AuthService) {}

  onSubmit() {
    this.loginBtnState = ClrLoadingState.LOADING;
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password)
      .subscribe({
        complete: () => this.loginBtnState = ClrLoadingState.SUCCESS,
        error: () => this.loginBtnState = ClrLoadingState.ERROR,
      });
  }
}
