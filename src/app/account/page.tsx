import Link from "next/link";
import LogOut from "./LogOut";

export default function AccountPage() {
  return (
    <div>
      <h1>this is account page</h1>
      <Link href="/">back to home </Link>
      <LogOut />
    </div>
  );
}
