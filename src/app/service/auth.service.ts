import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:3500';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/register`,
      {
        email,
        password,
        name,
      },
      this.httpOptions
    );
  }
  login(email: string, password: string): Observable<any> {
    const response: Observable<any> = this.http.post(
      `${this.BASE_URL}/auth`,
      { email, password },
      this.httpOptions
    );

    response.subscribe(
      (res) => {
        window.sessionStorage.setItem('accessToken', res.accessToken);
        window.sessionStorage.setItem('roles', JSON.stringify(res.roles));
      },
      (err) => {
        console.error(err);
        window.sessionStorage.clear();
      }
    );

    return response;
  }

  isLogged() {
    return window.sessionStorage.getItem('accessToken');
  }

  verifyRefreshToken() {
    try {
      this.refreshToken();
    } catch (err) {
      console.error(err);
    }
  }

  getRoles() {
    const roles = window.sessionStorage.getItem('roles') || '';
    const len = roles.length;
    const rol: number[] = [];

    window.sessionStorage
      .getItem('roles')
      ?.substring(1, len - 1)
      ?.split(',')
      .map((el) => rol.push(parseInt(el)));

    return rol;
  }

  logout(): Observable<any> {
    const response = this.http.get(`${this.BASE_URL}/logout`, this.httpOptions);

    response.subscribe(() => {
      window.sessionStorage.clear();
    });

    return response;
  }

  refreshToken() {
    const response: Observable<any> = this.http.get(
      `${this.BASE_URL}/refresh`,
      this.httpOptions
    );

    response.subscribe((res) => {
      window.sessionStorage.setItem('accessToken', res.accessToken);
    });

    return response;
  }
}
