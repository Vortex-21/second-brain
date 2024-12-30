import React, { useRef, useState } from "react";
import { Input } from "./Input";
import { onChangeHandler } from "../utils";
import { Button } from "./Button";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "../recoil/atoms/AuthAtoms";
import axios from "axios";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
const SigninPopup = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null); 
  const passwordRef = useRef<HTMLInputElement>(null); 
  const setAuthStatus = useSetRecoilState(AuthAtom);
  const setModalStatus = useSetRecoilState(ModalAtom); 
  async function onSubmitHandler() {
    try
    {const response = await axios.post(
      "http://localhost:3000/api/v1/signin",
      { username: usernameRef.current?.value, password: passwordRef.current?.value },
      { withCredentials: true }
    );
    console.log("response: ", response);
    if (response.status === 200) {
      // logged in successfully!
      setAuthStatus(true);
      setModalStatus("None");
    }}
    catch(err: any){
      console.log("error: ", err.response);
      alert(err.response.data.message)
    }
  }

  return (
    <div className="fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
      <form className="flex flex-col items-center">
        <Input
          placeholder="Username"
          ref = {usernameRef}
          // onChangeHandler={(e) => {
          //   onChangeHandler(e, setUsername);
          // }}
          // val={username}
        />
        <Input
          placeholder="Password"
          ref = {passwordRef}
          // onChangeHandler={(e) => {
          //   onChangeHandler(e, setPassword);
          // }}
          // val={password}
        />
        <Button
          variant="secondary"
          text="Submit"
          clickHandler={onSubmitHandler}
        ></Button>
      </form>
    </div>
  );
};

export default SigninPopup;