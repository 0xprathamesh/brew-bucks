import { ethers } from "ethers";
import { contractAbi, contractAddress } from "@/constants";
import { Profile } from "@/recoil/state";
import { useContractRead } from "wagmi";

const getContract = () => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // let contract = new ethers.Contract(contractAddress, contractAbi, signer);
  let provider;
  let signer;
  let contract: any;

  if (typeof window !== "undefined" && "ethereum" in window) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
  } else {
    provider = new ethers.providers.JsonRpcProvider();
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
  }

  const addProfile = async (
    name: string,
    username: string | string[],
    bio: string,
    twitterHandle: string,
    profileImage: string | undefined
  ): Promise<void> => {
    try {
      const tx = await contract.addProfile(
        name,
        username,
        bio,
        twitterHandle,
        profileImage
      );
      await tx.wait();
      console.log(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const getProfileByUsername = async (
    username: string | string[]
  ): Promise<Profile> => {
    try {
      const res = await contract.getProfileByUsername(username);
      return {
        id: res.id,
        name: res.name,
        username: res.username,
        bio: res.bio,
        twitterHandle: res.twitterHandle,
        profileImage: res.profileImage,
        balance: res.balance,
        createdAt: res.createdAt,
        walletAddress: res.walletAddress,
      };
    } catch (err) {
      throw err;
    }
  };

  const getProfileByAddress = async (): Promise<Profile> => {
    try {
      const res = await contract.getProfileByAddress();
      return {
        id: res.id,
        name: res.name,
        username: res.username,
        bio: res.bio,
        twitterHandle: res.twitterHandle,
        profileImage: res.profileImage,
        balance: res.balance,
        createdAt: res.createdAt,
        walletAddress: res.walletAddress,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const withdraw = async (userAddress:any) => {
    try {
      const tx = await contract.withdraw(userAddress);
      await tx.wait();
    } catch (err) {
      console.error(err);
    }
  };

  return { addProfile, getProfileByAddress, getProfileByUsername,withdraw };
};
export default getContract;
