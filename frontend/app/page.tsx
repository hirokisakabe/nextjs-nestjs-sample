import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="py-2">
        <div className="py-1 text-xl">New books</div>
        <div className="pl-3">
          <div className="py-1">no data</div>
        </div>
      </div>
      <div className="py-2">
        <div className="py-1 text-xl">Recommended books</div>
        <div className="pl-3">
          <div className="py-1">no data</div>
        </div>
      </div>
      <div className="py-2">
        <div className="py-1 text-xl">All books</div>
        <div className="pl-3">
          <Link href="books">
            <div className="py-1 underline">see all books</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Book Store",
};
