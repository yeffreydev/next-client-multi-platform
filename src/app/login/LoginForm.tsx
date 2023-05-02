"use client";
import { loginUser } from "@/api/user";
import { ILoginUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    server: "",
  });
  const [form, setForm] = useState<ILoginUser>({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.username) return setErrors((prevState) => ({ ...prevState, username: "username is required field" }));
    if (!form.password) return setErrors((prevState) => ({ ...prevState, password: "password is requried field" }));
    const { status, data } = await loginUser(form);
    if (status !== 200) {
      return setErrors((prevState) => ({ ...prevState, server: data.message }));
    }
    saveUserAuth(data.user);
    window.location.href = "/";
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setErrors((prevState) => ({ ...prevState, [name]: "", server: "" }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  return (
    <form onSubmit={handleSubmit} className={"flex w-full px-2 py-3 md:border border-gray-500 flex-col gap-5"}>
      <div className={"text-center"}>
        <h2>Social App</h2>
      </div>
      <fieldset className={"flex gap-2 flex-col w-full mx-auto"}>
        <input
          id={"username"}
          className="flex-1 bg-transparent border p-2 border-gray-500"
          onChange={handleChange}
          value={form.username}
          placeholder={"username"}
          name={"username"}
          type={"text"}
          autoComplete={"off"}
        />
      </fieldset>
      <fieldset className={"flex w-full gap-2 flex-col mx-auto"}>
        <input
          id={"password"}
          className="flex-1 bg-transparent border border-gray-500 p-2"
          onChange={handleChange}
          value={form.password}
          placeholder={"password"}
          name={"password"}
          type={"password"}
          autoComplete={"off"}
        />
      </fieldset>
      {errors.server && (
        <fieldset className="w-11/12 mx-auto ">
          <p className="text-red-500 text-sm text-center">{errors.server && "* " + errors.server}</p>
        </fieldset>
      )}
      <div className={"flex flex-1"}>
        <button className="px-20 py-[5px] font-bold  text-white mx-auto border border-gray-500 rounded-[15px]" type="submit">
          Log In
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 border border-gray-600 h-0"></span>
        <span className="">OR</span>
        <span className="flex-1 border h-0 border-gray-600"></span>
      </div>
      <div>
        <p className="text-center cursor-pointer">
          <AiFillFacebook className="inline text-blue-400" />
          <span className="text-sm ml-2">Log In with Facebook</span>
        </p>
        <p className="text-center cursor-pointer">
          <FcGoogle className="inline" /> <span className="text-sm ml-2">Log In with Google</span>
        </p>
      </div>
      <div className={"border p-2  border-gray-500 flex flex-1"}>
        <p className="text-sm w-full text-center">
          Need an Account?{" "}
          <b>
            <Link href="/register">Sign Up</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
