import Book from "@/components/book";

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Book />
    </>
  );
}

export const metadata = {
  title: "books | Book Store",
};
