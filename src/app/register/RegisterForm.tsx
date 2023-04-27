"use client";
import { registerUser } from "@/api/user";
import { IRegisterUser } from "@/types/user";
import { saveUserAuth } from "@/utils/authStorage";
import Link from "next/link";
import React, { useState } from "react";
import { validateFields } from "./helpers";

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
    <fieldset className={"flex gap-2 flex-col w-11/12 mx-auto"}>
      <div className="flex gap-2">
        <label className="w-[150px] text-sm" htmlFor={id}>
          {label}
        </label>
        <input id={id} className="flex-1 bg-transparent border-b" onChange={handleChange} value={value} placeholder={id} name={name} type={type} autoComplete={"off"} />
      </div>
      <span className="text-red-300 text-sm pl-[150px]">{error && "* " + error}</span>
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
    <form onSubmit={handleSubmit} className={"flex mt-[50px] flex-col gap-10 mx-auto md:w-7/12 lg:w-5/12"}>
      <div className={"text-center"}>
        <h1 className="font-bold text-2xl"> Register games4you </h1>
        <p className="italic text-sm">for more beatifull time with your friends</p>
      </div>
      <FormGroup type="email" id="email" label="email" name="email" value={registerForm.email} error={errors.email} handleChange={handleChange} />
      <FormGroup type="text" id="username" label="username" name="username" value={registerForm.username} error={errors.username} handleChange={handleChange} />
      <FormGroup type="password" id="password" label="password" name="password" value={registerForm.password} error={errors.password} handleChange={handleChange} />
      <FormGroup
        type="password"
        id="confirm-password"
        label="confirm password"
        name="confirmPassword"
        value={registerForm.confirmPassword}
        error={errors.confirmPassword}
        handleChange={handleChange}
      />
      <fieldset className={"flex flex-col w-11/12 mx-auto"}>
        <label className="flex items-center gap-2 text-sm" htmlFor="terms">
          <input className="cursor-pointer" onChange={handleChange} checked={registerForm.terms} name="terms" type={"checkbox"} />
          Accept terms of service and privacy policy
        </label>
        <span className="text-red-300 text-sm">{errors.terms && "* " + errors.terms}</span>
      </fieldset>
      {errors.server && (
        <fieldset className="w-11/12 mx-auto ">
          <p className="text-red-500 text-sm text-center">{errors.server && "* " + errors.server}</p>
        </fieldset>
      )}
      <fieldset className={"flex flex-1"}>
        <button className="px-20 py-2 bg-black text-white mx-auto rounded-xl" type="submit">
          Register
        </button>
      </fieldset>
      <div className={"w-11/12 mx-auto"}>
        <p className="text-sm">
          already have an Account?{" "}
          <b>
            <Link href="/login">Login</Link>
          </b>
        </p>
      </div>
    </form>
  );
}
