import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private userService: UserService) {}
  faClose = faWindowClose;

  users: any;
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => (this.users = res));
  }

  removeUser(email: string) {
    this.userService.removeUser(email).subscribe((res) => {
      this.users = this.users.filter((u: any) => u.email !== email);
    });
  }
}
