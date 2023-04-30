import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

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

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  constructor(private http: HttpClient) {}

  @Input('bookId')
  bookId: string = '';

  faEdit = faEdit;
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
  desc: string = '';
  GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

  ngOnInit(): void {
    if (this.bookId.length) {
      this.http
        .get<BookInt>(`${this.GOOGLE_BOOKS_API}${this.bookId}`)
        .subscribe((res) => {
          this.book = res;
          if (res.volumeInfo?.imageLinks?.thumbnail) {
            this.imgSrc = res.volumeInfo.imageLinks.thumbnail;
          }
        });
    }
  }
}
