import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import { currentUserState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { Profile } from "@/recoil/state";
import Link from "next/link";
import { ethers } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import { BsFillPersonFill } from "react-icons/bs";
import { LuAlertTriangle, LuAlertCircle } from "react-icons/lu";
import Loading from "@/components/elements/Loading";
import Copyable from "@/components/Copyable";
import { BiMoneyWithdraw } from "react-icons/bi";
import getContract from "@/hooks/getContract";
import { toast } from "react-hot-toast";

type Props = {
  profileData: Profile;
};

type Transaction = {
  from: string;
  name: string;
  message: string;
  amount: number;
  timestamp: number;
};

const Payouts = (props:Props) => {
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(currentUserState);
  const { address, isDisconnected } = useAccount();
  const {withdraw} = getContract();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleWithdraw = async () => {
    if (!isDisconnected) {
      const balance = currentUser?.profile?.balance;
      if (balance !== undefined && balance > 0) {
        try {
          toast("Transaction in Process..");
          await withdraw(address);
          toast.success("Balance Withdrawn Successfully..");
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("No balance to withdraw.");
      }
    }
  };
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
          <h3 className="text-2xl font font-semibold test-[#1181c] ">
            Payouts
          </h3>
          <div className="p-4">
            <div className="w-full m-auto p-2  border rounded-lg bg-[#f1f1f1] overflow-y-auto">
              <div className="border border-gray-400 m-4 p-4 rounded-md flex items-center justify-between">
                <div>
                  <h2 className="text-gray-500 p-4">Outstanding Balance</h2>
                  <h1 className="flex text-5xl items-end p-4">
                    {ethers.utils.formatEther(
                      currentUser?.profile?.balance || 0
                    )}{" "}
                    <span className="text-sm">MATIC</span>
                  </h1>
                </div>
                <div className="bg-[#222222] px-8 text-white py-2 text-md rounded-full flex items-center cursor-pointer" onClick={handleWithdraw}>
                  <BiMoneyWithdraw className="h-5 w-5 mr-2" />
                  Withdraw
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payouts;
