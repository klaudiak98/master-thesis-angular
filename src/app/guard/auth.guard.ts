import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.auth.isLogged();
    const userRoles = this.auth.getRoles();
    const allowedRoles = route.data['allowedRoles'];
    const allowed = userRoles.find((role) => allowedRoles?.includes(role));

    if (isLoggedIn && allowed) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
