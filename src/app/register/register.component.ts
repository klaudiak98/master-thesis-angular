import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private service: AuthService, private router: Router) {}

  public errMsg = '';

  registerForm = new FormGroup(
    {
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
      password: new FormControl(
        '',
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$'
        )
      ),
      matchPassword: new FormControl(''),
      name: new FormControl(''),
    },
    { validators: this.matchingPasswords }
  );

  onSubmit() {
    if (this.registerForm.valid) {
      this.service.RegisterUser(this.registerForm.value).subscribe(
        (data) => {
          this.router.navigate(['login']);
        },
        (err) => {
          if (!err.status) {
            this.errMsg = 'No Server Response';
          } else if (err?.status === 409) {
            this.errMsg = 'Account already exists';
          } else {
            this.errMsg = 'Registration faild';
          }
        }
      );
    } else {
      console.error(this.registerForm);
    }
  }

  public matchingPasswords(c: AbstractControl): ValidationErrors | null {
    const password = c.get(['password']);
    const matchPassword = c.get(['matchPassword']);
    if (password?.value !== matchPassword?.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  }
}
