import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

interface UserRes {
  name: string;
  email: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  faClose = faWindowClose;
  errMsg: string = '';
  user: UserRes = {
    email: '',
    name: '',
  };

  ngOnInit(): void {
    this.userService.getUser().subscribe((res: UserRes) => (this.user = res));
  }

  private matchingPasswords(c: AbstractControl): ValidationErrors | null {
    const password = c.get(['password']);
    const matchPassword = c.get(['matchPassword']);
    if (password?.value !== matchPassword?.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  }

  updateUserForm: FormGroup = new FormGroup(
    {
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

  handleSubmit() {
    const password: string = this.updateUserForm.value.password;
    const name: string = this.updateUserForm.value.name;

    this.userService.updateUser(this.user.email, name, password).subscribe({
      next: () => alert('Your account has been updated'),
      error: () => alert('Something went wrong'),
    });
  }

  signOut() {
    this.authService.logout().subscribe(() => window.location.reload());
  }
}
