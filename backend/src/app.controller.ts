import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BookService } from './book.service';
import { Book as BookModel } from '@prisma/client';

const BOOK_NUMBER_PER_PAGE = 10;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly bookService: BookService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('book/:id')
  async getBookById(@Param('id') id: string): Promise<BookModel> {
    return this.bookService.book({ id });
  }

  @Get('book')
  async getBooks(@Query('page') page: string): Promise<BookModel[]> {
    const pageNumber = page === undefined ? 0 : parseInt(page);

    return this.bookService.books({
      take: BOOK_NUMBER_PER_PAGE,
      skip: BOOK_NUMBER_PER_PAGE * pageNumber,
      orderBy: { createdAt: 'desc' },
    });
  }
}
