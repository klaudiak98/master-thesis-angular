import { Component, OnInit } from '@angular/core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
import { ShelfService } from '../service/shelf.service';

interface UserRes {
  name: string;
  email: string;
}

interface ShelfRes {
  _id: string;
  user: string;
  wantToRead: Array<string>;
  currentlyReading: Array<string>;
  read: Array<string>;
  __v: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private shelfService: ShelfService
  ) {}
  faSettings = faCogs;
  faClose = faWindowClose;

  user: UserRes = { name: '', email: '' };
  shelf: ShelfRes = {
    _id: '',
    user: '',
    wantToRead: [''],
    currentlyReading: [''],
    read: [''],
    __v: 0,
  };

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res: UserRes) => {
        this.user = res;
        this.shelfService
          .getShelf(this.user.email)
          .subscribe((res: ShelfRes) => (this.shelf = res));
      },
      error: (err) => {
        console.error(err);
        alert('Someting went wrong!');
      },
    });
  }
}
