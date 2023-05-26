import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dummyCategory = await prisma.category.create({
    data: {
      name: 'dummy_category_name',
    },
  });

  const books = [...Array(30).keys()].map((i) => {
    return {
      title: `Dummy Book ${i}`,
      price: 1000,
      categoryId: dummyCategory.id,
    };
  });

  await prisma.book.createMany({ data: books });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
