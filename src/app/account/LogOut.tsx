"use client";
import { deleteUserAuth } from "@/utils/authStorage";

export default function LogOut() {
  const handleLogout = () => {
    deleteUserAuth();
    window.location.href = "/login";
  };
  return <button onClick={handleLogout}>LogOut</button>;
}
