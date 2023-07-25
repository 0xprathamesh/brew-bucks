import Layout from "@/components/layout/Layout";
import { currentUserState } from "@/recoil/state";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useContractRead } from "wagmi";
import { Profile } from "@/recoil/state";
import Link from "next/link";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "@/constants";
import { LuAlertTriangle, LuAlertCircle } from "react-icons/lu";
import {
  BiSolidWalletAlt,
  BiSolidCalendar,
  BiSolidDollarCircle,
  BiMoneyWithdraw,
} from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import Copyable from "@/components/Copyable";
import Loading from "@/components/elements/Loading";

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

const Donations = ({ profileData }: Props) => {
  const [profile, setProfile] = useState<Profile>(profileData);
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(currentUserState);
  const { address, isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const parseAddress = (address: any) => {
    return address.slice(0, 6) + "..." + address.slice(-5, -1);
  };

  const getTotalAmountRecieved = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getTotalAmountReceivedFromSupporters",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  if (getTotalAmountRecieved?.data !== undefined) {
    const totalAmountRecieved = ethers.utils.formatEther(
      ethers.BigNumber.from(getTotalAmountRecieved.data).toString()
    );
    console.log(totalAmountRecieved);
  } else {
    console.error("Error: Data is undefined or empty.");
  }

  const getNumberofSenders = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getNumberofTreatSender",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  const withdrawnAmount = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getTotalAmountWithdrawn",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  console.log(withdrawnAmount?.data);

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

  const getFiveTx =
    getTxn !== null && getTxn !== undefined ? getTxn.slice(-5).reverse() : [];
  console.log(getFiveTx);
  if (getTotalAmountRecieved?.data !== undefined) {
    const totalAmountRecieved = ethers.utils.formatEther(
      ethers.BigNumber.from(getTotalAmountRecieved.data).toString()
    );
    console.log(totalAmountRecieved);
  } else {
    console.error("Error: Data is undefined or empty.");
  }
  const totalAmountReceived: unknown = getTotalAmountRecieved.data;
const formattedAmount: string = ethers.utils.formatEther(totalAmountReceived as ethers.BigNumberish);


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
            Donations
            {/* {getNumberofSenders?.data !== undefined ? (
          <p>{ethers.BigNumber.from(getNumberofSenders.data).toString()}</p>
        ) : null} */}
          </h3>
          <div className="grid lg:flex gap-5 mb-16 mt-4 lg:justify-between ">
            <div className="rounded-xl bg-[#f1f1f1] opacity-90 h-40 shadow-sm p-2 flex justify-between w-80 border-r-2 border-[#17c9648d]">
              <div className="flex flex-col w-auto p-5 mt-5 ">
                <p className="text-4xl font-bold">
                  {getNumberofSenders?.data !== undefined ? (
                    <p>
                      {ethers.BigNumber.from(
                        getNumberofSenders.data
                      ).toString()}
                    </p>
                  ) : null}
                </p>
                <p className="text-gray-600 mt-2 flex w-[8rem] ">
                  Your Supporters
                </p>
              </div>
              <p className=" flex justify-center items-center p-2 rounded-lg h-16 mt-10 px-10 mr-4 ">
                <BiSolidWalletAlt className="h-12 w-12 text-gray-700"></BiSolidWalletAlt>
              </p>
            </div>
            <div className="rounded-xl bg-[#f1f1f1] h-40 w-80 shadow-sm px-6 border-r-2 border-[#83235e94] flex justify-between ">
              <div className="flex flex-col w-auto p-5 mt-5 ">
                <p className="text-4xl font-bold">
                  {getNumberofSenders?.data !== undefined ? (
                    <p className="flex items-end">
                      {/* {ethers.utils.formatEther(
                        
                          getTotalAmountRecieved.data
                        .toString()
                      )} */} {formattedAmount}
                      <span className="text-sm">MATIC</span>
                    </p>
                  ) : null}
                </p>
                <p className="text-gray-600 mt-2 flex w-[8rem] ">
                  Last 30 days
                </p>
              </div>
              <p className=" flex justify-center items-center p-2 rounded-lg h-16 mt-10 px-10 mr-4 ">
                <BiSolidCalendar className="h-12 w-12 text-gray-700"></BiSolidCalendar>
              </p>
            </div>
            <div className="rounded-xl bg-[#f1f1f1] h-40 w-80 shadow-sm px-6 border-r-2 border-[#0072f597] flex justify-between">
              <div className="flex flex-col w-auto p-5 mt-5 ">
                <p className="text-4xl font-bold">
                  {getNumberofSenders?.data !== undefined ? (
                    <p className="flex items-end">
                      {ethers.utils.formatEther(
                        ethers.BigNumber.from(
                          getTotalAmountRecieved.data
                        ).toString()
                      )}
                      <span className="text-sm">MATIC</span>
                    </p>
                  ) : null}
                </p>
                <p className="text-gray-600 mt-2 flex w-[8rem] ">All Time</p>
              </div>
              <p className=" flex justify-center items-center p-2 rounded-lg h-16 mt-10 px-10 mr-4 ">
                <BiSolidDollarCircle className="h-12 w-12 text-gray-700" />
              </p>
            </div>
            <div className="rounded-xl bg-[#f1f1f1] h-40 w-80 shadow-sm px-6 border-r-2 border-[#0072f597] flex justify-between">
              <div className="flex flex-col w-auto p-5 mt-5 ">
                <p className="text-4xl font-bold">
                  {getNumberofSenders?.data !== undefined ? (
                    <p className="flex items-end">
                      {ethers.utils.formatEther(
                        ethers.BigNumber.from(withdrawnAmount.data).toString()
                      )}
                      <span className="text-sm">MATIC</span>
                    </p>
                  ) : null}
                </p>
                <p className="text-gray-600 mt-2 flex w-[8rem] ">
                  Withdrawn Amount
                </p>
              </div>
              <p className=" flex justify-center items-center p-2 rounded-lg h-16 mt-10 px-10 mr-4 ">
                <BiMoneyWithdraw className="h-12 w-12 text-gray-700"></BiMoneyWithdraw>
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-center mb-5">Recent Donations</p>
          <div className="w-full m-auto p-2  border rounded-lg bg-[#f1f1f1] overflow-y-auto">
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
              <span className="pl-3">From</span>
              <span className="sm:text-left text-right">Amount</span>
              <span className="hidden md:grid">Wallet Address</span>
              <span className="hidden sm:grid">Time</span>
            </div>
            <ul>
              {getTx?.data !== null &&
                getFiveTx.map((tx: Transaction, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <BsFillPersonFill className="dark-blue" />
                      </div>
                      <p className="pl-4">{tx.name}</p>
                    </div>
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
                ))}
            </ul>
          </div>{" "}
          {getTx?.data !== null && getFiveTx.length > 0 ? (
        <Link href="/transactions">
          <button className="bg-[#0072f5] m-5 mx-auto">See All Transactions</button>
        </Link>
          ) : (<p className="text-sm text-center mt-10">No Transactions to Show</p>)}
        </div>
      )}
      {loading ? <Loading /> : null}
    </Layout>
  );
};

export default Donations;
