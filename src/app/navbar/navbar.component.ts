import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  searchGroup: FormGroup = this.formBuilder.group({
    searchBook: '',
  });
  searchInput: string = '';

  faCogs = faCogs;
  GOOGLE_BOOKS_API: string = 'https://www.googleapis.com/books/v1/volumes?q=';
  books: any;

  clear() {
    this.searchInput = '';
    this.books = {};
  }

  ngOnInit(): void {
    this.searchGroup.valueChanges.subscribe((input) => {
      const controlValue: string = input.searchBook;
      this.searchInput = controlValue.replace(/\s+/g, '_');
      this.searchInput.length
        ? this.http
            .get(`${this.GOOGLE_BOOKS_API}${this.searchInput}`)
            .subscribe((res) => {
              this.books = res;
            })
        : (this.books = {});
    });
  }
}
