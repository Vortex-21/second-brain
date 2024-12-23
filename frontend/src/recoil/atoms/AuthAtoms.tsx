import { atom } from "recoil";

export const authAtom = atom({
    default:false, //not signed in
    key:"authState"
})