import { ConnectKitButton } from 'connectkit'
import { useRouter } from 'next/router'
import React from 'react'
import Logo from "@/public/Coffee.png"
import Image from 'next/image'

const NavBar = () => {
    const router = useRouter();
  return (
    <div className="border-b w-full relatice z-10 ">
    <div className="container mx-auto max-w-[1350px] py-[10px] flex justify-between items-center">
        <div onClick={() => router.push("/")} className='font-semibold text-xl flex items-center cursor-pointer'>
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
