import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  loggedIn = this.service.isLogged();
  errMsg = '';

  ngOnInit(): void {
    if (this.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      const email: string = this.loginForm.value?.email || '';
      const password: string = this.loginForm.value?.password || '';

      this.service.login(email, password).subscribe(
        (data) => {
          window.location.reload();
        },
        (err) => {
          if (!err?.status) {
            this.errMsg = 'No Server Response';
          } else if (err?.status === 400) {
            this.errMsg = 'Missing email or password';
          } else if (err?.status === 401) {
            this.errMsg = 'Unauthorized';
          } else {
            this.errMsg = 'Login faild';
          }
        }
      );
    } else {
      this.errMsg = 'Login failed';
    }
  }
}
