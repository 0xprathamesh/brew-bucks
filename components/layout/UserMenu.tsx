import { currentUserState } from "@/recoil/state";
import { Menu } from "@headlessui/react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useDisconnect } from "wagmi";
import { HiChevronDown } from "react-icons/hi";
import dynamic from "next/dynamic";

const UserMenu = () => {
  const { address } = useAccount();

  const currentUser = useRecoilValue(currentUserState);
  const { disconnect } = useDisconnect();
  const handleDisconnect = () => {
    disconnect();
    window.location.reload();
  };
  const parseAddress = () => {
    if (typeof address === "string") {
      return address.slice(0, 6) + "..." + address.slice(-5, -1);
    }
    return ""; // Return a default value if address is not a string or is undefined
  };

  return (
    <>
      {currentUser.hasProfile && <ConnectKitButton />}
      <Menu as="div" className="relative inline-block text-left">
        {currentUser.hasProfile ? (
          <Menu.Button className="dark-blue flex relative gap-2 rounded-lg py-1 px-2 pl-3 ml-4 ">
            {currentUser?.profile?.username}
            <HiChevronDown className="h-4 w-4" />
          </Menu.Button>
        ) : (
          <ConnectKitButton />
        )}

        <Menu.Items className="absolute shadow-2xl right-0 m-2 rounded-lg">
          <div className="p-1 text-left flex flex-col min-w-fit gap-1">
            {currentUser.hasProfile && (
              <Menu.Item>
                <Link href={`/u/${currentUser?.profile?.username}`}>
                  <p className="px-4 py-1 whitespace-nowrap font-display hover:bg-slate-700 rounded-lg">
                    My Channel
                  </p>
                </Link>
              </Menu.Item>
            )}
            {currentUser.hasProfile && (
              <Menu.Item>
                <Link href={`/dashboard`}>
                  <p className="px-4 py-1 whitespace-nowrap font-display text-left hover:bg-slate-700 rounded-lg">
                    Dashboard
                  </p>
                </Link>
              </Menu.Item>
            )}
            <hr className=" border-gray-600" />
            <Menu.Item>
              <button
                onClick={handleDisconnect}
                className=" hover:bg-slate-700 px-4 py-1 w-full block text-left rounded-lg font-normal"
              >
                Disconnect{" "}
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserMenu), { ssr: false });