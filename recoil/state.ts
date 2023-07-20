import { atom } from "recoil";

export type Profile = {
    id: number;
    name: string;
    username: string;
    bio: string;
    twitterHandle: string;
    profileImage: string;
    balance: number;
    createdAt: number;
    walletAddress: string;

};

type AppUserState = {
    profile?: Profile;
    loading: boolean;
    hasProfile: boolean;
};

export const currentUserState = atom<AppUserState>({
    key: "currentUser",
    default: { loading: true, hasProfile: false },
});