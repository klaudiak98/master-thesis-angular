import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ShelfRes {
  _id: string,
  user: string,
  wantToRead: Array<string>,
  currentlyReading: Array<string>,
  read: Array<string>,
  __v: number
}

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:3500';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  getShelf(email: string) {
    return this.http.post<ShelfRes>(
      `${this.BASE_URL}/shelves/my-shelf`,
      { email },
      this.httpOptions
    );
  }

  getBookState(email: string, bookId: string) {
    return this.http.post<string>(
      `${this.BASE_URL}/shelves/check-book`,
      {
        email,
        bookId,
      },
      this.httpOptions
    );
  }

  changeBookState(email: string, bookId: string, newState: string) {
    return this.http.put(
      `${this.BASE_URL}/shelves/update-book`,
      {
        email,
        bookId,
        newState,
      },
      this.httpOptions
    );
  }
}
