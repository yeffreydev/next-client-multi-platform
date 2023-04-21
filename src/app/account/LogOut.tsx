"use client";
import { deleteUserAuth } from "@/utils/authStorage";

export default function LogOut() {
  const handleLogout = () => {
    deleteUserAuth();
    window.location.href = "/login";
  };
  return (
    <button className="text-red-200 hover:underline" onClick={handleLogout}>
      LogOut
    </button>
  );
}
