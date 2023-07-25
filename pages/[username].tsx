import React, { useState, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import getContract from "@/hooks/getContract";
import Spinner from "@/components/elements/Spinner";
import { Profile } from "@/recoil/state";
import NavBar from "@/components/profile/NavBar";
import { useAccount, useContractRead } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { TfiTwitter } from "react-icons/tfi";
import { BiCoffeeTogo } from "react-icons/bi";
type Transaction = {
  from: string;
  name: string;
  message: string;
  amount: number;
  timestamp: number;
};
type Props = {};
const ProfilePage = (props: Props) => {
  const router: NextRouter = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState(0);
  const contract = getContract();
  const { address, isDisconnected } = useAccount();
  const { buyCoffee } = getContract();

  
  const checkIfUserHasProfile = async (): Promise<void> => {
    setLoading(true);
    try {
      const _profile: any = await contract.getProfileByUsername(username);
      setProfile(_profile);
      setHasProfile(true);
    } catch (err) {
      console.error(err);
      setHasProfile(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (username) {
      checkIfUserHasProfile();
    }
  }, [username]);

  const getTx = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getTx",
    args: [profile?.walletAddress],
    enabled: !!profile?.walletAddress,
    watch: true,
  });
  const getTxn: any = getTx?.data;
  const getFiveTx =
    getTxn !== null && getTxn !== undefined ? getTxn.slice(-5).reverse() : [];
  console.log(getFiveTx);
  const getNumberofSenders = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getNumberofTreatSender",
    args: [profile?.walletAddress],
    enabled: !!profile?.walletAddress,
    watch: true,
  });

  const parseAddress = (address: any) => {
    return address.slice(0, 6) + "..." + address.slice(-5, -1);
  };

  const handleBuyCoffee = async (e: any) => {
    e.preventDefault();
    try {
      toast("Transaction in Process..");
      await buyCoffee(profile?.walletAddress, name, message, amount);
    } catch (err) {
      console.error(err);
    }
  };

  if (profile) {
    const src = `https://w3s.link/ipfs/ + ${profile?.profileImage}`;
    return (
      <>
        <NavBar />
        <div>
          <picture>
            <img
              src="https://bafybeifhg4v6decztmek4nb2mmhhhjxh45umgn2feimvsurozmqnkbb6wy.ipfs.w3s.link/LinkedIn%20cover%20-%201.png"
              alt=""
            />
          </picture>

          <div className="relative">
            <div className="absolute top-[-4rem] right-[50rem] w-[8rem] h-[8rem] ring-4 ring-white rounded-full overflow-hidden flex items-center">
              <picture>
                <img
                  src={"https://w3s.link/ipfs/" + profile?.profileImage}
                  alt=""
                  className="h-full w-full"
                />
              </picture>
            </div>
            <div className="text-center pt-[5rem] w-full">
              <h1 className="text-2xl font-semibold">{profile?.name}</h1>
              <div className="text-sm text-gray-400 ">
                {" "}
                {getNumberofSenders?.data !== undefined ? (
                  <>
                    {ethers.BigNumber.from(getNumberofSenders.data).toNumber() >
                    0 ? (
                      <p className="">
                        {ethers.BigNumber.from(
                          getNumberofSenders.data
                        ).toString()}{" "}
                        Supporters | {parseAddress(profile?.walletAddress)}
                      </p>
                    ) : (
                      <p className="">{parseAddress(profile?.walletAddress)}</p>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-start mt-5 gap-10 m-2 p-4 ">
            <div className="border rounded-md py-8 px-4 max-w-xl w-full text-[#222222df] opacity-90 text-sm ">
              <p>{profile?.bio}</p>
              <a href={"https://twitter.com/" + profile?.twitterHandle}>
                <TfiTwitter className="hover:text-black h-6 w-6 mt-4" />
              </a>
            </div>

            <div className="border rounded-md py-8 px-4 max-w-2xl w-[25rem]">
              <h2 className="text-xl font-semibold text-[#222222] text-center">
                Buy <span className="text-gray-400">{profile?.name}</span> a
                BrewBucks Coffee
              </h2>
              <form
                onSubmit={handleBuyCoffee}
                className="flex flex-col items-center w-2xl "
              >
                <div className="grid gap-4 w-80">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mt-4 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-md text-gray-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="description" className=" text-sm">
                      Message
                    </label>
                    <textarea
                      id="description"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full rounded-md text-gray-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="amount" className="text-sm">
                      Amount (in Matic):
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        step="any"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        required
                        className="w-[9rem] rounded-md text-gray-500"
                      />
                      <div className="bg-gray-100 px-1 py-2.5 rounded-md ml-2 text-sm">
                        {" "}
                        1 Matic = $0.72 Approx
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    {!isDisconnected ? (
                      <button
                        type="submit"
                        className="bg-[#FFEA79] px-8 text-[#222222c3] "
                        disabled={profile?.walletAddress === address}
                      >
                        {profile?.walletAddress === address
                          ? "Cannot Buy Coffee for Self"
                          : "Buy " + profile?.name + " A Coffee"}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-[#FFEA79] px-8 text-[#222222] "
                      >
                        Connect Wallet
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full max-w-xl justify-center m-2 p-4 ml-[21rem]">
            <p className="text-sm font-bold mb-3">
              {" "}
              {getNumberofSenders?.data !== undefined ? (
                <>
                  {ethers.BigNumber.from(getNumberofSenders.data).toNumber() >
                  0 ? (
                    <p className="">
                      Recent Supporters
                    </p>
                  ) : null}
                </>
              ) : null}
            </p>
            {getTx?.data !== null && (
              <ul className="space-y-4 grid">
                {getFiveTx.map((tx: Transaction, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-md shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {tx.name} bought BrewBucks Coffee for{" "}
                        {ethers.utils.formatEther(tx.amount)} Matic.
                      </span>
                    </div>
                    <p className="block m-2 bg-[#ffeb79bc] w-40 text-center p-2 rounded-md">
                      {tx.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    );
  } else if (loading) {
    return (
      <>
        <NavBar />
        <div className="h-[85vh] flex flex-col gap-2 items-center justify-center">
          <Spinner className="w-12 fill-slate-400 mr-1 animate-spin dark-blue" />
          Fetching profile...
        </div>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <NavBar />
        <div className="h-[85vh] flex items-center justify-center">
          Profile Not Found!!
        </div>
      </>
    );
  }
};

export default ProfilePage;
