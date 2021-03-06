import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyCommonModule } from '../common/my-common.module';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  declarations: [
    BookComponent,
    BookDetailComponent,
    BookListComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    MyCommonModule,
  ],
})
export class BookModule { }
