import Layout from "@/components/layout/Layout";
import { currentUserState } from "@/recoil/state";
import React, {useEffect} from "react";
import { useRecoilValue } from "recoil";
import { useAccount, useContractWrite,useContractRead } from "wagmi";
import { Profile } from "@/recoil/state";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
type Props = {
  profileData: Profile;
};
const MintNft = ({ profileData }: Props) => {
  const contractAddress = "0x88eB6c8730Bb3891541640D36C900C97d6Fec893";
  const contractAbi = [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "approved",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "operator",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "bool",
          "name": "approved",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "BatchMetadataUpdate",
      "inputs": [
        {
          "type": "uint256",
          "name": "_fromTokenId",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "_toTokenId",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MetadataUpdate",
      "inputs": [
        {
          "type": "uint256",
          "name": "_tokenId",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "_tokenIdToUsername",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getApproved",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "operator",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isOwner",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mintNFT",
      "inputs": [
        {
          "type": "address",
          "name": "_to",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "_username",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address payable"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ownerOf",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        },
        {
          "type": "bytes",
          "name": "data",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "inputs": [
        {
          "type": "address",
          "name": "operator",
          "internalType": "address"
        },
        {
          "type": "bool",
          "name": "approved",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "type": "bytes4",
          "name": "interfaceId",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenURI",
      "inputs": [
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "tokenId",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ];
  const { address } = useAccount();
  const currentUser = useRecoilValue(currentUserState);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "mintNFT",
  });



  const handleMintNft = async () => {

    try {
      await write({
        args: [address, currentUser?.profile?.username],
        value: BigInt(ethers.utils.parseEther("0.01").toString()),
      });

      // Transaction sent successfully, wait for confirmation
    } catch (error) {
      // Handle any error here
      toast.error("Error while minting NFT. Please try again.");
    }
  };
  
  useEffect(() => {
    if (isSuccess) {
      // Show a toast for successful minting after the transaction is confirmed
      toast.success("NFT minted successfully!");
    }
  }, [isSuccess]);

  return (
    <Layout>
      <div className="flex items-center flex-col mx-auto mt-20 border rounded-md p-4 max-w-[fit-content]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          height="400"
          fill="none"
        >
          <path fill="url(#B)" d="M0 0h400v400H0z" />
          <defs>
            <filter
              id="A"
              color-interpolation-filters="sRGB"
              filterUnits="userSpaceOnUse"
              height="400"
              width="400"
            >
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="2"
                flood-opacity=".225"
                width="200%"
                height="200%"
              />
            </filter>
          </defs>
          <defs>
            <linearGradient
              id="B"
              x1="0"
              y1="0"
              x2="400"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF9D0A" />
              <stop offset="1" stopColor="#f7dae9" stopOpacity=".99" />
            </linearGradient>
          </defs>
          <image
            href="https://i.ibb.co/1JMpby7/Group-3.png"
            width="200"
            height="200"
            x="100"
            y="60"
          />

          <text
            x="200"
            y="300"
            fontSize="30"
            fill="#c06e21"
            fontFamily="Fira Code, sans-serif"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {currentUser?.profile?.username}
          </text>
        </svg>

        <button
          className={`mx-auto bg-[#0072f5] px-8 mt-10 `}
          onClick={() => write({
            args: [address, currentUser?.profile?.username],
            value: BigInt(ethers.utils.parseEther("0.01").toString()),
          })}
          
        >
          MintNft
        </button>
        {!currentUser?.hasProfile && (
          <p className="text-sm p-5 text-red-500">
            * You need to create a profile before minting NFT.
          </p>
        )}
        <p className="text-sm p-5 text-red-500">* You can only mint a NFT once. </p>
      </div>

    </Layout>
  );
};

export default MintNft;
