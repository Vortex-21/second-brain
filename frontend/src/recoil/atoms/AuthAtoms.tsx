import { atom } from "recoil";

export const AuthAtom = atom({
    default:false, //not signed in
    key:"authState"
})