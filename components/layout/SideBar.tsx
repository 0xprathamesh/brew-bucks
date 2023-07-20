import { currentUserState } from "@/recoil/state";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, {
  JSXElementConstructor,
  ReactNode,
  forwardRef,
  Ref,
  useEffect,
} from "react";
import { useRecoilState } from "recoil";
import { HiUser } from "react-icons/hi";
import {
  BiSolidDashboard,
  BiHeart,
  BiSolidGift,
  BiSolidWalletAlt,
  BiSolidBolt,
  BiAt,
  BiTransfer,
  BiCodeBlock,
  BiLinkExternal,
} from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Image from "next/image";
import { useAccount, useWalletClient } from "wagmi";
import getContract from "@/hooks/getContract";

type SideBarProps = {
  showNav: boolean;
};

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
  ({ showNav }, ref: Ref<HTMLDivElement>) => {
    const { data: walletClient } = useWalletClient({
      onSuccess(data) {
        console.log("Success", data);
      },
    });
    const contract = getContract();
    const router: NextRouter = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const mainItems = [
      {
        name: "Donations",
        href: "/donations",
        icon: BiHeart,
      },
      {
        name: "Extras",
        href: "/extras",
        icon: BiSolidGift,
      },
      {
        name: "Followers",
        href: "/followers",
        icon: HiUser,
      },
      {
        name: "Transactions",
        href: "/transactions",
        icon: BiTransfer,
      },
    ];
    const settingItem = [
      {
        name: "Buttons",
        href: "/buttons",
        icon: BiCodeBlock,
      },
      {
        name: "Integrations",
        href: "/integrations",
        icon: BiSolidBolt,
      },
      {
        name: "Payouts",
        href: "/payouts",
        icon: BiSolidWalletAlt,
      },
      {
        name: "Account",
        href: "/account",
        icon: BiAt,
      },
    ];
    const checkIfUserHasProfile = async () => {
      setCurrentUser({ ...currentUser, loading: true });
      console.log("Checking...");
      const _profile: any = await contract.getProfileByAddress();
      if (_profile?.username) {
        setCurrentUser({
          ...currentUser,
          hasProfile: true,
          loading: false,
          profile: _profile,
        });
      } else {
        setCurrentUser({ ...currentUser, hasProfile: false, loading: false });
      }
    };
    useEffect(() => {
      if (walletClient) {
        checkIfUserHasProfile();
      }
    }, [walletClient]);

    return (
      <>
        <div
          ref={ref}
          className="fixed w-56 h-full bg-white shadow-sm border-2 overflow-auto"
        >
          <div className="flex justify-center mt-4 mb-10">
            {/* <Image alt="image" width={100} height={20} src={Logo} /> */}
            <h4 className="text-2xl font-semibold ">BrewBucks</h4>
          </div>
          <div className="flex flex-col">
            <Link href="/dashboard">
              <div
                className={`pl-6 py-2 mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors text-[16px] leading-6 ${
                  router.pathname == "/dashboard"
                    ? "sidebar-active text-gray-800"
                    : "text-gray-500 hover:bg-gray-200 "
                }`}
              >
                <div className="mr-2">
                  <BiSolidDashboard
                    className={`h-5 w-5 ${
                      router.pathname == "/dashboard" ? "dark-blue" : ""
                    }`}
                  />
                </div>
                <div>
                  <p>Home</p>
                </div>
              </div>
            </Link>
            <Link href={`/${currentUser?.profile?.username}`}>
              <div className="pl-6 py-2 mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors text-gray-400 text-[16px] hover:bg-gray-200 ">
                <div className="mr-2">
                  <MdOutlineSpaceDashboard className="h-5 w-5 " />
                </div>
                <div>
                  <p className="">View Page</p>
                </div>
                <div className="ml-4">
                  <BiLinkExternal className="h-4 w-4" />
                </div>
              </div>
            </Link>
            {/* Main Menu */}
            <div className="pl-6 py-2 text-[10px] mb-1 mt-3 text-gray-600">
              <p>MAIN MENU</p>
            </div>
            {mainItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className={`pl-6 py-2  mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors text-[16px] ${
                    router.pathname == item.href
                      ? "sidebar-active text-gray-800"
                      : "text-gray-500 hover:bg-gray-200"
                  }  `}
                >
                  <div className="mr-2">
                    <item.icon
                      className={`h-5 w-5 ${
                        router.pathname === item.href ? "dark-blue" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <p>{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="pl-6 py-2 text-[10px] mb-1 mt-3 text-gray-600">
              <p>SETTINGS</p>
            </div>
            {settingItem.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className={`pl-6 py-2  mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors text-[16px] ${
                    router.pathname == item.href
                      ? "sidebar-active text-gray-800"
                      : "text-gray-500 hover:bg-gray-200"
                  }  `}
                >
                  <div className="mr-2">
                    <item.icon
                      className={`h-5 w-5 ${
                        router.pathname === item.href ? "dark-blue" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <p>{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
            {!currentUser.loading && !currentUser.hasProfile && (
              <Link href="/signup" className="md:hidden block mt-4 mb-5">
                <button className="bg-[#0072f5] mx-5 pl-6 ">
                  Create Profile
                </button>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
);
SideBar.displayName = "SideBar";

export default SideBar;
