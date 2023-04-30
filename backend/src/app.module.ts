import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BookService } from './book.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, BookService],
})
export class AppModule {}
