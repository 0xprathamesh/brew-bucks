import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "react-hot-toast";
import { currentUserState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import Loading from "@/components/elements/Loading";
import getContract from "@/hooks/getContract";
import { useAccount, useWalletClient } from "wagmi";
import { Profile } from "@/recoil/state";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/profile/Avatar";
import { HiArrowUpTray, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { LuAlertTriangle, LuAlertCircle } from "react-icons/lu";
import { ethers } from "ethers";
type Props = {
  profileData: Profile;
};
const list = [
  { time: "Last 90 Days" },
  { time: "Last 1 Year" },
  { time: "All Time" },
];
const Dashboard = ({ profileData }: Props) => {
  const [profile, setProfile] = useState<Profile>(profileData);
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const { data: walletClient } = useWalletClient();
  const { address, isDisconnected } = useAccount();
  console.log(currentUser?.profile?.balance);

  const router = useRouter();
  return (
    <Layout>
      {!currentUser.loading && !currentUser.hasProfile && (
        <div className="w-[22rem] flex items-center justify-center text-lg border-2 border-red-300 m-auto mt-[25%] p-8 rounded-md">
          <p className="flex items-center gap-2">
            No Profile Found, Create one{" "}
            <LuAlertCircle className="h-5 w-5 text-red-400" />
          </p>
        </div>
      )}
      {isDisconnected && (
        <div className="w-80 flex items-center justify-center text-lg border-2 border-red-300 m-auto mt-[25%] p-8 rounded-md">
          <p className="flex gap-2 items-center">
            Please Connect Wallet!
            <LuAlertTriangle className="h-5 w-5 text-red-400" />
          </p>
        </div>
      )}
      {currentUser.hasProfile && (
        <div>
          <div className="flex justify-between items-center bg-[#f1f1f1] w-full h-40 px-6">
            <div className="flex">
              <Avatar
                src={
                  "https://w3s.link/ipfs/" + currentUser?.profile?.profileImage
                }
              />
              <div className="ml-5 p-3 ">
                <h4 className="text-2xl font-semibold cursor-pointer">
                  Hi, {currentUser?.profile?.name}
                </h4>
                <Link href={`/username`} className="text-sm text-gray-500">
                  <p>
                    {window.location.host}/{currentUser?.profile?.username}
                  </p>
                </Link>
              </div>
            </div>
            <div className="bg-[#222222] px-8 text-white py-2 text-md rounded-full flex items-center">
              <HiArrowUpTray className="h-5 w-5 mr-2" />
              Share Page
            </div>
          </div>
          <div className="mt-4 bg-[#f1f1f1] w-[25rem] h-40 ">
            <div className="flex items-center gap-5">
              <h4 className="text-2xl font-semibold text-[#121212] m-5 ">
                Earnings
              </h4>
              <div className="relative flex flex-col items-center w-[10rem]  rounded-lg ">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="bg-white text-sm py-2 w-full flex text-[#121212] items-center justify-center rounded-full active:border-black duration-300 border border-gray-400 "
                >
                  Last 30 days
                  {!isOpen ? (
                    <HiChevronDown className="h-4 ml-2 w-4" />
                  ) : (
                    <HiChevronUp className="h-4 ml-2 w-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute top-12 flex flex-col items-start w-full rounded-md bg-white   ">
                    {list.map((item, i) => (
                      <div
                        className="flex w-full justify-between cursor-pointer rounded-r-md text-sm pl-5 m-1 hover:text-gray-400 "
                        key={i}
                      >
                        <h3>{item.time} </h3>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-5 pt-4">
              <h1 className="flex text-5xl items-end">
                {ethers.utils.formatEther(currentUser?.profile?.balance || 0)}{" "}
                <span className="text-sm">MATIC</span>
              </h1>
              <p></p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
