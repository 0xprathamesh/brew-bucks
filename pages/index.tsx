import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/router";
import React from "react";
import Logo from "@/public/Coffee.png";
import Image from "next/image";
import { useAccount } from "wagmi";
import Link from "next/link";
const Home = () => {
  const router = useRouter();
  const { isConnected, isDisconnected } = useAccount();

  return (
    <div>
      <div className="border-b w-full relative z-10">
        <div className="container mx-auto max-w-[1350px] py-[10px] flex justify-between items-center">
          <div
            onClick={() => router.push("/")}
            className="font-bold text-2xl flex items-center cursor-pointer text-[#222222]"
          >
            <Image alt="" src={Logo} width={50} height={50} />
            BrewBucks
          </div>
          <div className="flex items-center">
            {isConnected ? (
              <div
                onClick={() => router.push("/dashboard")} // Redirect to the dashboard
                className="cursor-pointer mr-4 text-md text-[#0072f5] hover:text-[#0072f5cd]"
              >
                Dashboard
              </div>
            ) : null}
            <ConnectKitButton />
          </div>
        </div>
      </div>
      <section className=" text-[#222222]  h-[80vh] flex justify-center items-center">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mx-auto text-center">
            <h1 className="lg:text-[70px] font-secondary bg-gradient-to-r from-[#ffe75c] via-[#FF9D0A] to-[#855916] bg-clip-text text-5xl text-transparent font-bold">
              Buy Coffee onChain{" "}
            </h1>
            <div className="mx-auto mt-4 font-primary  sm:text-xl sm:leading-relaxed">
            BrewBucks: A web3 platform enabling coffee purchases on-chain using Matic. Unlock the seamless coffee buying experience with the power of blockchain technology. Sip, savor, and support Creators.
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/signup`}
                className="block w-full rounded px-8 py-2 text-md font-medium font-secondary text-[#222222] sm:w-auto bg-[#FFEA79] "
              >
                Create Your Page
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
