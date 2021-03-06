import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  books$: Observable<Book[]>;
  currentBooks: Book[];
  selectedBookId: number;

  pagination = {
    'pageSize': 3,
    'currentPage': 1,
    'totalItems': 0,
    'lastBtnDisabled': true
  };

  actionName = '上一页';

  badCurly = 'bad curly';

  isSpecial = false;

  keyword = '';

  constructor(
    private service: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.books$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedBookId = +params.get('id');
        return this.service.getBooks();
      })
    );

    this.books$.subscribe((books: Book[]) => {
      this.books = books;
      this.pagination.totalItems = books.length;
      this.currentBooks = this.books.slice((this.pagination.currentPage - 1) * this.pagination.pageSize,
        this.pagination.currentPage * this.pagination.pageSize);
      setTimeout(() => {
        this.currentBooks[0].isNew = false;
      }, 5000);
    });
  }

  last = function (): void {
    this.pagination.currentPage--;
    if (this.pagination.currentPage <= 1) {
      // this.pagination.currentPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
      this.pagination.lastBtnDisabled = true;
    }
    this.currentBooks = this.books.slice((this.pagination.currentPage - 1) * this.pagination.pageSize,
      this.pagination.currentPage * this.pagination.pageSize);
  };

  next = function (): void {
    this.pagination.currentPage++;
    this.pagination.lastBtnDisabled = false;
    if (this.pagination.currentPage > Math.ceil(this.pagination.totalItems / this.pagination.pageSize)) {
      this.pagination.currentPage = 1;
      this.pagination.lastBtnDisabled = true;
    }
    this.currentBooks = this.books.slice((this.pagination.currentPage - 1) * this.pagination.pageSize,
      this.pagination.currentPage * this.pagination.pageSize);
  };

  search = function (str: string): void {
    this.keyword = str.toUpperCase();
    this.currentBooks = [];
    this.books.forEach((element: Book) => {
      if (str && element.name.indexOf(str) !== -1) {
        this.currentBooks.push(element);
      }
    });
  };

  deleteHero = function (deleteBook: Book) {
    console.log(deleteBook.toString());
  };

}
