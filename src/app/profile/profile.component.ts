import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private service: AuthService, private userService: UserService) {}
  faSettings = faCogs;
  faClose = faWindowClose;
  user: any;

  books = [
    {
      title: 'Book 1',
      author: 'sdas',
      id: 1,
      img: 'asdas',
    },
    {
      title: 'Book2',
      author: 'sdafsddzs',
      id: 2,
      img: 'asdas',
    },
    {
      title: 'Book 3',
      author: 'sfdsd',
      id: 3,
      img: 'asdas',
    },
  ];

  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => (this.user = res));
  }

  signOut() {
    this.service.logout().subscribe(() => window.location.reload());
  }
}
