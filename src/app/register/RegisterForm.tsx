"use client";
import { registerUser } from "@/api/user";
import { IRegisterUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  const [registerForm, setRegisterForm] = React.useState<IRegisterUser>({
    email: "",
    username: "",
    password: "",
    terms: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: name === "terms" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!registerForm.terms) return alert("accept terms to continue");
    const { status, data } = await registerUser(registerForm);
    if (status !== 200) {
      return alert("Missing credentials");
    }
    saveUserAuth(data.user);
    window.location.href = "/";
  };
  return (
    <form onSubmit={handleSubmit} className={"flex mt-[50px] flex-col gap-14 mx-auto md:w-7/12 lg:w-5/12"}>
      <div className={"text-center"}>
        <h2> create an account</h2>
        <p>more time with your friends.</p>
      </div>
      <div className={"flex gap-2 flex-col w-11/12 mx-auto"}>
        <label htmlFor="">email</label>
        <input className="flex-1 bg-transparent border-b" onChange={handleChange} placeholder="email" name="email" type="text" autoComplete={"off"} />
      </div>
      <div className={"flex gap-2 flex-col w-11/12 mx-auto"}>
        <label htmlFor=""> username</label>
        <input className="flex-1 bg-transparent border-b" onChange={handleChange} placeholder="username" name="username" type="text" autoComplete={"off"} />
      </div>
      <div className={"flex gap-2 flex-col w-11/12 mx-auto"}>
        <label htmlFor="">password</label>
        <input className="flex-1 bg-transparent border-b" onChange={handleChange} placeholder="password" name="password" type="text" autoComplete={"off"} />
      </div>
      <div className={"flex w-11/12 mx-auto"}>
        <label className="flex gap-2" htmlFor="terms">
          <input className="cursor-pointer" onChange={handleChange} checked={registerForm.terms} name="terms" type={"checkbox"} />
          terms of service and privacy policy
        </label>
      </div>
      <div className={"flex flex-1"}>
        <button className="px-20 py-2 bg-black text-white mx-auto rounded-xl" type="submit">
          Register
        </button>
      </div>
      <div className={"w-11/12 mx-auto"}>
        <p>
          already have an Account?{" "}
          <b>
            <Link href="/login">Login</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
