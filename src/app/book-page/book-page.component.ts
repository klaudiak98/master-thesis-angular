import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../service/shelf.service';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';

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
  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private userService: UserService,
    private http: HttpClient
  ) {}
  GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

  bookId: string = '';
  book: BookInt = {
    id: '',
    volumeInfo: {
      imageLinks: {
        thumbnail: '',
      },
      title: '',
      subtitle: '',
      authors: [''],
      publisher: '',
      publishedDate: '',
      description: '',
    },
  };
  imgSrc: string = 'assets/book-cover-placeholder.png';
  bookState: string = '';
  user: UserInt = {
    email: '',
    name: '',
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
      this.http
        .get<BookInt>(`${this.GOOGLE_BOOKS_API}${this.bookId}`)
        .subscribe((res) => {
          this.book = res;
          if (res.volumeInfo?.imageLinks?.thumbnail) {
            this.imgSrc = res.volumeInfo.imageLinks.thumbnail;
          }
        });
    });

    this.userService.getUser().subscribe((res) => {
      this.user = res;
      this.shelfService
        .getBookState(this.user.email, this.bookId)
        .subscribe((res) => (this.bookState = res));
    });
  }

  handleSave() {
    const response = this.shelfService
      .changeBookState(this.user.email, this.bookId, this.bookState)
      .subscribe();
    response.add(alert('The book has been saved'));
  }

  removeFromShelves() {
    const response = this.shelfService
      .changeBookState(this.user.email, this.bookId, '')
      .subscribe();
    response.add(alert('The book has been removed from your shelves'));
    this.bookState = '';
  }
}
