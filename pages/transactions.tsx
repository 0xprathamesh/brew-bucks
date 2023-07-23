import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import { currentUserState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { Profile } from "@/recoil/state";
import Link from "next/link";
import { ethers } from "ethers";
import { useAccount, useContractRead } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import { BsFillPersonFill } from "react-icons/bs";
import { LuAlertTriangle, LuAlertCircle } from "react-icons/lu";
import Loading from "@/components/elements/Loading";
import Copyable from "@/components/Copyable";

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


const Transactions = ({ profileData }: Props) => {
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(currentUserState);
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    setLoading(false);
  }, []);

  const parseAddress = (address: any) => {
    return address.slice(0, 6) + "..." + address.slice(-5, -1);
  };

  const getTx = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getTx",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  const getTxn: any = getTx?.data;
  console.log(getTx?.data);

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
            All Transactions
          </h3>
          <div className="pt-4 pb-4">
            <div className="w-full m-auto p-2  border rounded-lg bg-[#f1f1f1] overflow-y-auto">
              <div className="my-3 p-2 grid md:grid-cols-5  sm:grid-cols-3 grid-cols-2 items-center justify-between  cursor-pointer">
                <span>From</span>
                <span className="sm:text-left text-right">Message</span>
                <span className="hidden md:grid">Amount</span>
                <span className="hidden sm:grid">Wallet Address</span>
                <span className="hidden sm:grid">Timestamp</span>
              </div>
              <ul>
                {getTx?.data !== null && getTxn.map((tx: Transaction, index: number) => (
                  <li
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <BsFillPersonFill className="dark-blue" />
                    </div>
                    <p className="pl-4">{tx.name}</p>
                    </div>
                    
                    <p>{tx.message}</p>
                  <div className="flex items-center">
                    <p className="text-gray-800 font-bold ">
                      {ethers.utils.formatEther(tx.amount)}
                    </p>
                    <p className="text-gray-800 text-[8px] pt-2 ml-2">
                      MATIC
                    </p>
                  </div>
                  <p>
                    <Copyable
                      text={parseAddress(tx.from)}
                      copyText={tx.from}
                    />
                  </p>
                  <p>
                    {new Date(Number(tx.timestamp) * 1000).toLocaleString()}{" "}
                  </p>
                </li>

                ) ) }
              </ul>
            </div>
          </div>
        </div>
      )}
      {loading ? <Loading /> : ""}
    </Layout>
  );
};

export default Transactions;
