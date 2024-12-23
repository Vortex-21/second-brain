import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
import { useSetRecoilState } from "recoil";
import { onChangeHandler } from "../utils";
const SignupPopup = () => {
  const setModalStatus = useSetRecoilState(ModalAtom); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const onChangeUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value);
  // };

  // const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };
  const onSubmitHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("username: ", username, "password: ", password);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        username,
        password,
      });
      console.log("response: ", response);
      if(response.status === 200){
        alert("Sign Up successful. Please Login!")

      }
      else {
        alert(response.data.message)
      }
    } 
    catch (err: any) {
      // console.log("error.response: ", err.response.data.message[0].message);
      let errorString = "";
      for(let e of err.response.data.message){
        errorString += e.message + "\n";
      }
      console.log("errorString: ",errorString)
      if(err.response){
       alert(errorString)
        // console.log("err.response: ", )
        setModalStatus("Signin")
      }
    }
  };

  return (
    <div className="fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
      <form className="flex flex-col items-center">
        <Input
          placeholder="Username"
          onChangeHandler={(e) => {
            onChangeHandler(e, setUsername);
          }}
          val={username}
        />
        <Input
          placeholder="Password"
          onChangeHandler={(e) => {
            onChangeHandler(e, setPassword);
          }}
          val={password}
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

export default SignupPopup;
