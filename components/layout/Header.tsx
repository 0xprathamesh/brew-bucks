import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import UserMenu from "./UserMenu";
import { useRecoilValue } from "recoil";
import { currentUserState } from "@/recoil/state";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

type Props = {
  showNav: boolean;
  setShowNav: (show: boolean) => void;
};
type Prop = {};

const Header = ({ showNav, setShowNav }: Props) => {
  const { address } = useAccount();
  const currentUser = useRecoilValue(currentUserState);
  return (
    <>
      <div
        className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] border-b ${
          showNav ? "pl-56" : ""
        }`}
      >
        <div className="pl-4 md:pl-16">
          <HiOutlineMenuAlt1
            className="h-8 w-8 text-gray-700 cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          />
        </div>
        <div
          className={`flex items-center pr-4 md:pr-16 ${
            showNav ? "hidden md:flex" : ""
          } `}
        >
          {!currentUser.loading && !currentUser.hasProfile && (
            <Link href="/signup" className="hidden md:block">
              <button className="bg-[#0072f5] mr-3">Create Profile</button>
            </Link>
          )}
          {!address && !currentUser.hasProfile ? (
            <ConnectKitButton />
          ) : (
            <UserMenu />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
