"use client";
import { loginUser } from "@/api/user";
import { ILoginUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import { useState } from "react";
import { FormGroup } from "../register/RegisterForm";

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
    <form onSubmit={handleSubmit} className={"flex mt-[50px] flex-col gap-16 mx-auto md:w-7/12 lg:w-5/12"}>
      <div className={" text-center"}>
        <h2>Welcome back</h2>
        <p>{"You're"} the best player</p>
      </div>
      <FormGroup type="text" value={form.username} error={errors.username} name="username" id="username" label="username" handleChange={handleChange} />
      <FormGroup type="password" value={form.password} error={errors.password} name="password" id="password" label="password" handleChange={handleChange} />
      {errors.server && (
        <fieldset className="w-11/12 mx-auto ">
          <p className="text-red-500 text-sm text-center">{errors.server && "* " + errors.server}</p>
        </fieldset>
      )}
      <div className={"flex flex-1"}>
        <button className="px-20 py-2 font-bold bg-slate-800 text-white mx-auto rounded-xl" type="submit">
          Login
        </button>
      </div>
      <div className={"w-11/12 mx-auto"}>
        <p className="text-sm">
          Need an Account?{" "}
          <b>
            <Link href="/register">Register</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
