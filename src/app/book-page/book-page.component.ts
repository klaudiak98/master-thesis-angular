import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../service/shelf.service';
import { UserService } from '../service/user.service';
import { switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface BookInt {
  id: string;
  volumeInfo: {
    imageLinks: {
      thumbnail: string;
    };
    title: string;
    subtitle: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
  };
}

interface UserInt {
  email: string;
  name: string;
}

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  bookId: string = '';
  book$: Observable<BookInt> = new Observable<BookInt>();
  bookState$: Observable<string> = new Observable<string>();

  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private userService: UserService,
    private http: HttpClient
  ) {}
  GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

  imgSrc: string = 'assets/book-cover-placeholder.png';
  user: UserInt = {
    email: '',
    name: '',
  };

  getBook(bookId: string) {
    console.log('a tu wchodzi');
    return this.http.get<BookInt>(`${this.GOOGLE_BOOKS_API}${bookId}`);
  }
  
  BASE_URL = 'http://localhost:3500';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
    });

    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });

    this.book$ = this.route.params.pipe(
      switchMap((params) => this.getBook(params['bookId']))
    );

    this.bookState$ = combineLatest([
      this.userService.getUser(),
      this.route.params,
    ]).pipe(
      switchMap(([user, params]) =>
        this.getBookState(user.email, params['bookId'])
      )
    );
  }

  handleSave() {
    let newState = '';
    this.bookState$.subscribe((val: string) => (newState = val));

    const response = this.shelfService
      .changeBookState(this.user.email, this.bookId, newState)
      .subscribe();
    response.add(alert('The book has been saved'));
  }

  removeFromShelves() {
    const response = this.shelfService
      .changeBookState(this.user.email, this.bookId, '')
      .subscribe();
    response.add(alert('The book has been removed from your shelves'));
    this.bookState$ = of('');
  }
}
