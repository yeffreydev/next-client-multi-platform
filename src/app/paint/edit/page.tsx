import Link from "next/link";

export default function EditPage() {
  return (
    <div className="w-full flex flex-col">
      <h1>try use a paint</h1>
      <Link href="/paint" className="bg-cyan-900 p-3">
        go to paints
      </Link>
    </div>
  );
}
