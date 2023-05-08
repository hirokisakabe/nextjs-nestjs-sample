export default async function Book() {
  const res = await fetch(process.env.BACKEND_URL + "/book?page=0", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const books = await res.json();

  return (
    <>
      {books.map((book: { title: string }) => (
        <>{book.title}</>
      ))}
    </>
  );
}
