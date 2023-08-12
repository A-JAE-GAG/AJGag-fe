import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: false,
});

export const gagModalState = atom({
    key: "gagmModalState",
    default: false,
});