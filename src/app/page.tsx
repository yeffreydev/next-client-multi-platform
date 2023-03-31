import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Landing from "./Landing";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex justify-between mx-auto md:w-10/12 lg:w-9/12">
        <div>
          <span>logo</span>
        </div>
        <nav>
          <ul>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Landing />
    </>
  );
}
