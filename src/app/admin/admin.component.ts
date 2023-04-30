import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

interface UserInt {
  email: string;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private userService: UserService) {}
  faClose = faWindowClose;
  users: Array<UserInt> = [
    {
      email: '',
      name: '',
    },
  ];

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((res: Array<UserInt>) => (this.users = res));
  }

  deleteUser(email: string) {
    this.userService.deleteUser(email).subscribe({
      next: () => {
        this.users = this.users.filter((u: UserInt) => u.email !== email);
        alert('The user has been removed.');
      },
      error: (err) => {
        alert('Something went wrong!');
      }
    })
  }
}
