import Header from "@/ui/Header";
import Landing from "./Landing";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header>
        <Link href={"/"}>This Logo</Link>
      </Header>
      <Landing />
    </>
  );
}
