import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserInt {
  email: string;
  name: string;
}

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
    return this.http.get<Array<UserInt>>(
      `${this.BASE_URL}/users`,
      this.httpOptions
    );
  }

  getUser() {
    return this.http.get<UserInt>(
      `${this.BASE_URL}/users/me`,
      this.httpOptions
    );
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

  deleteUser(email: string) {
    return this.http.post<{ message: string }>(
      `${this.BASE_URL}/users/delete`,
      { email },
      this.httpOptions
    );
  }
}
