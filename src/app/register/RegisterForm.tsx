"use client";
import { registerUser } from "@/api/user";
import { IRegisterUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import React, { useState } from "react";
import { validateFields } from "./helpers";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface FormGroupProps {
  id: string;
  label: string;
  name: string;
  value: string;
  error: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormGroup: React.FC<FormGroupProps> = ({ id, type, label, name, value, error, handleChange }) => {
  return (
    <fieldset className={"flex gap-2 flex-col w-full mx-auto"}>
      <input id={id} className="flex-1 bg-transparent border border-gray-500 p-[5px]" onChange={handleChange} value={value} placeholder={label} name={name} type={type} autoComplete={"off"} />
      {/* <span className="text-red-300 text-sm pl-[150px]">{error && "* " + error}</span> */}
    </fieldset>
  );
};

export default function RegisterForm() {
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: "",
    server: "",
  });

  const [registerForm, setRegisterForm] = React.useState<IRegisterUser>({
    email: "",
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget;
    setErrors((prevState) => ({ ...prevState, [name]: "", server: "" }));

    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: name === "terms" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { key, error } = validateFields(registerForm);
    console.log(key, error);
    if (error) {
      return setErrors((prevState) => ({ ...prevState, [key]: error }));
    }
    const { status, data } = await registerUser(registerForm);
    if (status !== 200) {
      return setErrors((prevState) => ({ ...prevState, server: data.message }));
    }
    saveUserAuth(data.user);
    window.location.href = "/";
  };
  return (
    <form onSubmit={handleSubmit} className={"flex w-full px-2 py-3 md:border border-gray-500 flex-col gap-4"}>
      <div className={"text-center"}>
        <h1 className="font-bold text-2xl"> Social App </h1>
        <p className="italic text-sm">for more beatifull time with your friends</p>
      </div>
      <FormGroup type="email" id="email" label="email" name="email" value={registerForm.email} error={errors.email} handleChange={handleChange} />
      <FormGroup type="full-name" id="full-name" label="full name" name="fullName" value={registerForm.email} error={errors.email} handleChange={handleChange} />
      <FormGroup type="text" id="username" label="username" name="username" value={registerForm.username} error={errors.username} handleChange={handleChange} />
      <FormGroup type="password" id="password" label="password" name="password" value={registerForm.password} error={errors.password} handleChange={handleChange} />
      {errors.server && (
        <fieldset className="w-11/12 mx-auto ">
          <p className="text-red-500 text-sm text-center">{errors.server && "* " + errors.server}</p>
        </fieldset>
      )}
      <fieldset className={"flex flex-1"}>
        <button className="px-20 py-[5px] border border-gray-500 text-white mx-auto rounded-[15px]" type="submit">
          Register
        </button>
      </fieldset>
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
          already have an Account?{" "}
          <b>
            <Link href="/login">Log In</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
