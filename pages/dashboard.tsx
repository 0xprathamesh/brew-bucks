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
import { HiArrowUpTray } from "react-icons/hi2";
type Props = {
  profileData: Profile;
};
const Dashboard = ({ profileData }: Props) => {
  const [profile, setProfile] = useState<Profile>(profileData);
  const currentUser = useRecoilValue(currentUserState);
  const { data: walletClient } = useWalletClient();
  const { address, isDisconnected } = useAccount();
  const router = useRouter();
  return (
    <Layout>
      {!currentUser.loading && !currentUser.hasProfile && (
        <div className="w-80 flex items-center justify-center text-lg border-2 border-gray-300 m-auto mt-[25%] p-8 rounded-md">
          <p>No Profile Found,Create one !</p>
        </div>
      )}
      {isDisconnected && (
        <div className="w-80 flex items-center justify-center text-lg border-2 border-gray-300 m-auto mt-[25%] p-8 rounded-md">
          <p>Please Connect Wallet!</p>
        </div>
      )}
      {currentUser.hasProfile && (
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
      )}
    </Layout>
  );
};

export default Dashboard;
