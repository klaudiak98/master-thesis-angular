import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  errMsg: any;

  constructor(private userService: UserService) {}
  faClose = faWindowClose;

  public matchingPasswords(c: AbstractControl): ValidationErrors | null {
    const password = c.get(['password']);
    const matchPassword = c.get(['matchPassword']);
    if (password?.value !== matchPassword?.value) {
      return { mismatchedPasswords: true };
    }
    return null;
  }

  user: any;
  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => (this.user = res));
  }

  updateUserForm = new FormGroup(
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
    const password: string = this.updateUserForm.value?.password || '';
    const name: string = this.updateUserForm.value?.name || '';

    this.userService
      .updateUser(this.user.email, name, password)
      .subscribe((res) => console.log(res));
  }
}
