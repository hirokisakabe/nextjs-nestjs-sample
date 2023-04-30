import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async book(
    postWhereUniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async books(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { data, where } = params;
    return this.prisma.book.update({
      data,
      where,
    });
  }

  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.prisma.book.delete({
      where,
    });
  }
}
