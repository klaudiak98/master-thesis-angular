import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private authServcie: AuthService) {}

  users: any;
  ngOnInit(): void {
    this.authServcie.getUsers().subscribe((res) => (this.users = res));
  }
}
