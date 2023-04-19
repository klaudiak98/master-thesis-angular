import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  books = [
    {
      title: 'Book 1',
      author: 'sdas',
      id: 1,
      img: 'asdas',
    },
    {
      title: 'Book2',
      author: 'sdafsddzs',
      id: 2,
      img: 'asdas',
    },
    {
      title: 'Book 3',
      author: 'sfdsd',
      id: 3,
      img: 'asdas',
    },
  ];
  
  constructor() {}

  ngOnInit(): void {}
}
