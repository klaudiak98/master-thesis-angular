import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:3500';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  getUsers() {
    return this.http.get(`${this.BASE_URL}/users`, this.httpOptions);
  }

  getUser() {
    return this.http.get(`${this.BASE_URL}/users/me`, this.httpOptions);
  }

  updateUser(email: string, name: string, password: string) {
    if (password.length) {
      return this.http.patch(
        `${this.BASE_URL}/users/update`,
        JSON.stringify({
          email,
          password,
          name,
        }),
        this.httpOptions
      );
    } else {
      return this.http.patch(
        `${this.BASE_URL}/users/update`,
        JSON.stringify({
          email,
          name,
        }),
        this.httpOptions
      );
    }
  }

  removeUser(email: string) {
    return this.http.post(
      `${this.BASE_URL}/users/delete`,
      { email },
      this.httpOptions
    );
  }
}
