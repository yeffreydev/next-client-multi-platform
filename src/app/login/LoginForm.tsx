"use client";
import { loginUser } from "@/api/user";
import { ILoginUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState<ILoginUser>({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data } = await loginUser(form);
    if (status === 200) {
      saveUserAuth(data.user);
      return (window.location.href = "/");
    }
    alert("bad request");
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  return (
    <form onSubmit={handleSubmit} className={"flex mt-[50px] flex-col gap-16 mx-auto md:w-7/12 lg:w-5/12"}>
      <div className={" text-center"}>
        <h2>Welcome back</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className={"flex gap-2 flex-col w-11/12 mx-auto"}>
        <label className="" htmlFor="username">
          {" "}
          username{""}
        </label>
        <input name="username" onChange={handleChange} className="flex-1 bg-transparent border-b px-2" placeholder="username or email" type="text" autoComplete="off" />
      </div>
      <div className={"flex gap-2 flex-col w-11/12 mx-auto"}>
        <label className="" htmlFor="password">
          password
        </label>
        <input name="password" onChange={handleChange} className="flex-1 bg-transparent border-b px-2" placeholder="password" type="text" autoComplete="off" />
      </div>
      <div className={"flex flex-1"}>
        <button className="px-20 py-2 bg-black text-white mx-auto rounded-xl" type="submit">
          Login
        </button>
      </div>
      <div className={"w-11/12 mx-auto"}>
        <p>
          Need an Account?{" "}
          <b>
            <Link href="/register">Register</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
