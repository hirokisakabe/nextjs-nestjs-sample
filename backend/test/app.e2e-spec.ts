import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.book.deleteMany();
    await prisma.category.deleteMany();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/book/:id (GET)', async () => {
    const category = await prisma.category.create({
      data: {
        name: 'dummy_category_a',
      },
    });

    const dummyBookA = await prisma.book.create({
      data: {
        title: `dummy_book_a`,
        price: 1000,
        categoryId: category.id,
      },
    });

    const dummyBookB = await prisma.book.create({
      data: {
        title: `dummy_book_a`,
        price: 2000,
        categoryId: category.id,
      },
    });

    const dummyBookC = await prisma.book.create({
      data: {
        title: `dummy_book_a`,
        price: 3000,
        categoryId: category.id,
      },
    });

    const result = await request(app.getHttpServer()).get(
      `/book/${dummyBookA.id}`,
    );

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      id: dummyBookA.id,
      title: `dummy_book_a`,
      price: 1000,
      categoryId: category.id,
    });
  });

  it('/book (GET)', async () => {
    const category = await prisma.category.create({
      data: {
        name: 'dummy_category_a',
      },
    });

    const data = [...Array(50)]
      .map((_, i) => i)
      .map((i) => ({
        title: `dummy_book_${i}`,
        price: 1000,
        categoryId: category.id,
      }));

    for await (const d of data) {
      await prisma.book.create({ data: d });
    }

    data.reverse();

    const result0 = await request(app.getHttpServer()).get('/book');

    expect(result0.status).toBe(200);
    expect(result0.body).toMatchObject(data.slice(0, 10));

    const result1 = await request(app.getHttpServer()).get('/book?page=0');

    expect(result1.status).toBe(200);
    expect(result1.body).toMatchObject(data.slice(0, 10));

    const result2 = await request(app.getHttpServer()).get('/book?page=1');

    expect(result2.status).toBe(200);
    expect(result2.body).toMatchObject(data.slice(10, 20));
  });
});
