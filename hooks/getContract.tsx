import { ethers } from "ethers";
import { contractAbi, contractAddress } from "@/constants";
import { Profile } from "@/recoil/state";

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(contractAddress, contractAbi, signer);
  // let provider: ethers.providers.Web3Provider | undefined;
  // let signer: ethers.providers.JsonRpcSigner | undefined;
  // let contract: ethers.Contract | undefined;

  // if (typeof window !== "undefined" && "ethereum" in window) {
  //   provider = new ethers.providers.Web3Provider(window.ethereum);
  //   signer = provider.getSigner();
  //   contract = new ethers.Contract(contractAddress, contractAbi, signer);
  // } else {
  //   console.error("Web3 provider not available. Make sure you are using a Web3-enabled browser.");
  // }

  const addProfile = async (
    name: string,
    username: string | string[],
    bio: string,
    twitterHandle: string,
    profileImage: string
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

  const getProfileByUsername = async (username: string | string[]): Promise<Profile> => {
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
      throw err
    }
  }

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
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
export default getContract