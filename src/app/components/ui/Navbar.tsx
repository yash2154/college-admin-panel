import React from "react";
import LogoutButton from "./Logoutbutton";
import { useAuthContext } from "../../context/authContext";
import { RxAvatar } from "react-icons/rx";
import renaissancelogo from "@/assets/renaissancelogo.png";
import Image from "next/image";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-full h-[10vh] bg-neutral-950 p-10 flex flex-row items-center justify-between md:justify-evenly">
      <div className="flex flex-row gap-1 items-center justify-center">
        <h1 className="text-xl md:text-2xl text-white">College Admin Panel</h1>
        <Image
          src={renaissancelogo}
          className="h-10 w-10 hidden lg:block"
          alt="logo"
        ></Image>
      </div>
      <div className="flex flex-row-reverse gap-5 items-center">
        <LogoutButton />
        {authUser && (
          <div className="relative flex items-center gap-1 group">
            <RxAvatar
              className="text-2xl text-white"
              aria-label="User Avatar"
            />
            <h1 className=" text-white">{authUser.username}</h1>
            <div className="absolute top-10 left-0 hidden mb-8 w-56 p-4 bg-neutral-900 text-white rounded-lg shadow-lg group-hover:block z-50">
              <p>
                <strong className="pr-2">Fullname:</strong> {authUser.name}
              </p>
              <p>
                <strong className="pr-2">email:</strong> {authUser.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
