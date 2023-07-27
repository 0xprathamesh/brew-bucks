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
import { BiMoneyWithdraw } from "react-icons/bi";
import getContract from "@/hooks/getContract";
import { toast } from "react-hot-toast";

type Props = {
  profileData: Profile;
};

type Transaction = {
  amount: number;
  timestamp: number;
};

const Payouts = ({ profileData }: Props) => {
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(currentUserState);
  const { address, isDisconnected } = useAccount();
  const { withdraw } = getContract();

  useEffect(() => {
    setLoading(false);
  }, []);

  const getTx = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getAllWithdrawTxns",
    args: [address],
    enabled: !!address,
    watch: true,
  });

  const getTxn: any = getTx?.data;
  console.log(getTxn);
  const transactions = Array.isArray(getTxn) ? getTxn : [];
   console.log(transactions);
   

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
                <div
                  className="bg-[#222222] px-8 text-white py-2 text-md rounded-full flex items-center cursor-pointer"
                  onClick={handleWithdraw}
                >
                  <BiMoneyWithdraw className="h-5 w-5 mr-2" />
                  Withdraw
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl m-auto p-2  border rounded-lg bg-[#f1f1f1] overflow-y-auto">
            <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-2 items-center cursor-pointer">
              <span className="sm:text-left text-right">Amount</span>

              <span className="hidden sm:grid">Time</span>
            </div>
            <ul>
              {transactions.length > 0&&
                transactions.map((tx: Transaction, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-2 sm:grid-cols-2 grid-cols-2 items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <p className="text-gray-800 font-bold ">
                        {ethers.utils.formatEther(tx.amount)}
                      </p>
                      <p className="text-gray-800 text-[8px] pt-2 ml-2">
                        MATIC
                      </p>
                    </div>

                    <p>
                      {new Date(Number(tx.timestamp) * 1000).toLocaleString()}{" "}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          {getTxn.length < 0 ? (
            <p className="text-sm text-center mt-10">No Transactions to Show</p>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default Payouts;
