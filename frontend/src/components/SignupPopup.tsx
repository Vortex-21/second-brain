import React, { useRef } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

import axios from "axios";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
import { useSetRecoilState } from "recoil";

const SignupPopup = () => {
  const setModalStatus = useSetRecoilState(ModalAtom); 
  const usernameRef = useRef<HTMLInputElement>(null); 
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const onSubmitHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log("response: ", response);
      if(response.status === 200){
        alert("Sign Up successful. Please Login!")
        setModalStatus("Signin")

      }
      else {
        alert(response.data.message)
      }
    } 
    catch (err: any) {
      // console.log("Error: ", err)
      let errorString: string = "";
      if(typeof(err.response.data.message) === 'string'){
        errorString = err.response.data.message; 
      }
      else{
        for(let e of err.response.data.message){
          errorString += e.message + "\n";
        }

      }
      console.log("errorString: ",errorString)
      if(err.response){
       alert(errorString)
        // console.log("err.response: ", )
        // setModalStatus("Signin")
      }
    }
  };




  return (
    
    <div className="fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
      
      <p className=" text-4xl mb-10">Sign Up</p>
      <form className="flex flex-col items-center justify-center">
        <Input
          placeholder="Username"
          ref = {usernameRef}
        />
        <Input
          placeholder="Password"
          ref = {passwordRef}
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
