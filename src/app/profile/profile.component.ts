import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private service: AuthService) {}

  signOut() {
    this.service.logout().subscribe(() => window.location.reload());
  }
}
