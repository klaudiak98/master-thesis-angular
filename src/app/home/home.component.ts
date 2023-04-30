import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ROLES = {
    User: 100,
    Admin: 777,
  };

  constructor(private service: AuthService) {}

  userRoles = this.service.getRoles();
  isAdmin = this.userRoles.includes(this.ROLES.Admin);

  ngOnInit(): void {}
}
