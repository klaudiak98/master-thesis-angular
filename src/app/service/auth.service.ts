import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'http://localhost:3500';

  GetAllUsers(){
    return this.http.get(`${this.BASE_URL}/users`);
  }

  RegisterUser(newUserData: any) {
    return this.http.post(`${this.BASE_URL}/register`,newUserData);
  }

  LoginUser(userData: any) {
    return this.http.post(`${this.BASE_URL}/login`,userData);
  }
}
