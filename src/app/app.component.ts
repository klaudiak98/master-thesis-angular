import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';
import { EventBusService } from './service/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'master-thesis-angular';

  eventBusSub?: Subscription;

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout() {
    this.authService.logout().subscribe(() => window.location.reload());
  }
}
