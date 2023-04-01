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

  success = false;
  errMsg = '';

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
      const email: string = this.registerForm.value?.email || '';
      const password: string = this.registerForm.value?.password || '';
      const name: string = this.registerForm.value?.name || '';

      this.service.register(email, password, name).subscribe(
        (data) => {
          this.success = true;
          this.router.navigate(['login']);
        },
        (err) => {
          this.success = false;
          if (!err?.status) {
            this.errMsg = 'No Server Response';
          } else if (err?.status === 409) {
            this.errMsg = 'Account already exists';
          } else {
            this.errMsg = 'Registration faild';
          }
        }
      );
    } else {
      this.success = false;
      this.errMsg = 'Registration failed';
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
