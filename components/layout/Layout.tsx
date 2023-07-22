import { useState, useEffect, Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import { useAccount, useWalletClient } from "wagmi";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/state";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import SideBar from "./SideBar";
import getContract from "@/hooks/getContract";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const { data: walletClient } = useWalletClient({
      onSuccess(data) {
        console.log("Success");
      },
    });
    const contract = getContract();
  
    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
  
    function handleResize() {
      if (innerWidth <= 640) {
        setShowNav(false);
        setIsMobile(true);
      } else {
        setShowNav(true);
        setIsMobile(false);
      }
    }
  
    useEffect(() => {
      if (typeof window !== "undefined" && "ethereum" in window) {
        addEventListener("resize", handleResize);
      }
      return () => {
        removeEventListener("resize", handleResize);
      };
    }, []);
  
    const checkIfUserHasProfile = async () => {
      setCurrentUser({ ...currentUser, loading: true });
      console.log("Checking...");
      const _profile: any = await contract.getProfileByAddress();
      if (_profile?.username) {
        setCurrentUser({
          ...currentUser,
          hasProfile: true,
          loading: false,
          profile: _profile,
        });
      } else {
        setCurrentUser({ ...currentUser, hasProfile: false, loading: false });
      }
    };
    useEffect(() => {
      if (walletClient) {
        checkIfUserHasProfile();
      }
    }, [walletClient]);
    return (
      <>
        <Header showNav={showNav} setShowNav={setShowNav} />
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <SideBar showNav={showNav} />
        </Transition>
        <div
          className={`pt-16 transition-all duration-[400ms] ${
            showNav && !isMobile ? "pl-56" : ""
          }`}
        >
          <div className="px-4 md:px-16 my-5">
            <div>{children}</div>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </>
    );
  };
  
  export default Layout;
