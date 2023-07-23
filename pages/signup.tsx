import Spinner from "@/components/elements/Spinner";
import getContract from "@/hooks/getContract";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, Ref, useState, forwardRef } from "react";
import { useAccount } from "wagmi";
import { HiOutlineX, HiCamera } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/recoil/state";
import { useRouter, NextRouter } from "next/router";
import { toast } from "react-hot-toast";
import useWeb3Storage from "@/hooks/useWeb3Storage";
import Layout from "@/components/layout/Layout";

type Props = {
  web3storageToken: string;
};
export async function getStaticProps() {
  const token = process.env.ACCESS_TOKEN;
  return {
    props: {
      web3storageToken: token,
    }, // will be passed to the page component as props
  };
}
const Signup = (props: Props) => {
  const { address, isDisconnected } = useAccount();
  const router: NextRouter = useRouter();
  const [minting, setMinting] = useState<boolean>();
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>();
  const { addProfile } = getContract();
  const [error, setError] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const contract = getContract();
  const { storeFile } = useWeb3Storage();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMinting(true);
    const name = e.target.name.value;
    const username = e.target.username.value;
    const bio = e.target.bio.value;
    const twitterHandle = e.target.twitterHandle.value;
    const profileImgFile = filePickerRef.current?.files?.[0];

    if (!profileImgFile) {
      setError([...error, "Please Choose Profile Image"]);
    }
    if (!name && !username && !bio && !twitterHandle) {
      setError([...error, "Please Fill All Fields"]);
    }
    if (name && username && bio && twitterHandle && profileImgFile) {
      try {
        toast("Uploading Profile Picture on IPFS");
        const profileImageUri = await storeFile(
          profileImgFile,
          props.web3storageToken
        );
        console.log("Profile Picture Uploaded to " + profileImageUri);
        toast("Creating Profile...");
        await addProfile(name, username, bio, twitterHandle, profileImageUri);
        toast.success("Profile Created Successfully..");
        setMinting(false);
        router.push("/dashboard");
      } catch (err) {
        console.error(err);
      }
    }
    setMinting(false);
  };

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

  const handleFileChange = () => {
    const file = filePickerRef.current?.files?.[0];
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!file) {
      return false;
    }

    const { size, type } = file;

    if (!fileTypes.includes(type)) {
      toast.error("File format must be either png or jpg");
      return false;
    }  
    // Check file size to ensure it is less than 2MB.
    if (size / 1024 / 1024 > 2) {
      toast.error("File size exceeded the limit of 2MB");
      return false;
    }
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      const target = readerEvent.target;
      if (target) {
        setSelectedFile(target.result?.toString());
      }
    };
  };
  if (isDisconnected) {
    router.push("/");
  }
  const closeModal = () => {
    router.push("/dashboard");
  };

  return (
    <Layout>
        <Transition appear show={true}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/30" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-fit p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title className="text-2xl border-b border-b-gray-400 pb-4 text-center w-full  font-bold font-display text-gray-800 ">
                    Create Profile
                  </Dialog.Title>
                  <div>
                    <form
                      className=" flex pt-4 justify-center gap-8 items-center w-full "
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-8 relative flex justify-center items-center ">
                        {selectedFile && (
                          <HiOutlineX
                            onClick={() => setSelectedFile(null)}
                            className="cursor-pointer shadow-lg ring-1 ring-white duration-200 hover:shadow-2xl hover:scale-110 h-6 w-6 top-3 right-3 absolute bg-red-500 p-1 rounded-full "
                          />
                        )}
                        <div
                          onClick={() => filePickerRef.current?.click()}
                          className="cursor-pointer object-center object-contain ring-1 ring-slate-500 overflow-hidden rounded-full   border-dashed flex items-center justify-center h-40 w-40"
                        >
                          <input
                            type="file"
                            ref={filePickerRef}
                            onChange={handleFileChange}
                            hidden
                          />
                          {!selectedFile && (
                            <p className="text-xs text-center font-display">
                              <span className="flex items-center justify-center">
                                <HiCamera className="h-6 w-6 " />
                              </span>
                              Click to upload profile picture
                            </p>
                          )}
                          {selectedFile && (
                            <picture>
                              {" "}
                              <img
                                src={selectedFile}
                                alt="profile-picture"
                                className="h-full w-full"
                              />
                            </picture>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col w-auto col-span-2 ">
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" placeholder="Name" />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex flex-col col-span-2 mt-2 w-40">
                            <label htmlFor="username">Username</label>
                            <input
                              type="text"
                              name="username"
                              placeholder="Enter username"
                            />
                          </div>
                          <div className="flex flex-col col-span-2 mt-2 w-40">
                            <label htmlFor="twitterHandle">Twitter </label>
                            <input
                              type="text"
                              name="twitterHandle"
                              placeholder="Twitter Username"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 col-span-2">
                          <label htmlFor="bio">Bio</label>
                          <textarea
                            name="bio"
                            placeholder="Say something about yourself"
                          />
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button
                            type="submit"
                            disabled={minting}
                            className="bg-[#0072f5]   disabled:bg-opacity-90 disabled:text-gray-300"
                          >
                            {minting && (
                              <Spinner className="w-5 fill-slate-100 mr-1 animate-spin text-violet-900" />
                            )}
                            {minting && "Creating Profile..."}
                            {!minting && "Create Profile"}
                          </button>
                          <button
                            onClick={closeModal}
                            className="bg-slate-700 hover:bg-slate-600 text-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {error.length > 0 && (
                    <div className="w-full text-center italic font-medium text-red-400 mt-4">
                      {error?.map((err) => (
                        <p key={err}> * {err}</p>
                      ))}
                    </div>
                  )}
                </div>
                
              </Transition.Child>
            </div>
            
          </Dialog>
        </Transition>
      </Layout>
  );
};

export default Signup;
