import Image from "next/image";

export default async function Book() {
  const res = await fetch(process.env.BACKEND_URL + "/book?page=0", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const books = await res.json();

  return (
    <div className="grid grid-cols-4 gap-10">
      {books.map((book: { title: string; id: string }) => (
        <div key={book.id}>
          <Image src="/no_image.png" width={300} height={300} alt="no_image" />
          <div className="px-1 py-1">{book.title}</div>
        </div>
      ))}
    </div>
  );
}
