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
    username: string | string[] | undefined
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
        totalAmountReceived: res.totalAmountReceived,
        totalAmountWithdrawn: res.totalAmountWithdrawn,
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
        totalAmountReceived: res.totalAmountReceived,
        totalAmountWithdrawn: res.totalAmountWithdrawn,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const withdraw = async (userAddress: any) => {
    try {
      const tx = await contract.withdraw(userAddress);
      await tx.wait();
    } catch (err) {
      console.error(err);
    }
  };
  // const buyCoffee = async (
  //   address: string | undefined,
  //   name: string,
  //   message: string,
  //   amount: ethers.BigNumber // Change the type of the amount parameter to BigNumber
  // ) => {
  //   try {
  //     const tx = await contract.buyCoffee(address, name, message, {
  //       value: amount, // Use the BigNumber directly, no need to parse it again.
  //     });
  //     await tx.wait();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // const buyCoffee = async (
  //   address: string | undefined,
  //   name: string,
  //   message: string,
  //   amount: number
  // ) => {
  //   try {
  //     const tx = await contract.buyCoffee(address, name, message, {
  //       value: ethers.utils.parseEther(amount.toString()),
  //     });
  //     await tx.wait();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const buyCoffee = async (address: string | undefined, name: string, message: string, amount: number) => {
    try {
      const _amount = ethers.utils.parseEther(amount.toString());
      const tx = await contract.buyCoffee(address, name, message, _amount, { value: _amount, });
      await tx.wait();
    } catch (err) {
      console.error(err);
      
      
    }
    
  }


  return {
    addProfile,
    getProfileByAddress,
    getProfileByUsername,
    withdraw,
    contract,
    buyCoffee,
  };
};
export default getContract;
