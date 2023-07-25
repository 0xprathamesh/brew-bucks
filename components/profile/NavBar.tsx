import { ConnectKitButton } from 'connectkit'
import { useRouter } from 'next/router'
import React from 'react'
import Logo from "@/public/Coffee.png"
import Image from 'next/image'
import { useAccount } from "wagmi";
const NavBar = () => {
  const router = useRouter();
  const {isConnected} = useAccount()
  return (
    <div className="border-b w-full relatice z-10 ">
    <div className="container mx-auto max-w-[1350px] py-[10px] flex justify-between items-center">
        <div onClick={() => router.push("/")} className='font-bold text-2xl flex items-center cursor-pointer text-[#222222]'>
          <Image alt='' src={Logo} width={50} height={50} />
          BrewBucks
        </div>
      <div>
        <ConnectKitButton />
      </div>
    </div>
  </div>
  )
}

export default NavBar
