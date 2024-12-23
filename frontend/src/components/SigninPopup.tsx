import React, { useState } from 'react'
import { Input } from './Input';
import { onChangeHandler } from '../utils';
import { Button } from './Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const SigninPopup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(){
    const response = await axios.post("http://localhost:3000/api/v1/signin", {username, password}, {withCredentials: true});
    console.log("response: ", response);
  }

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
  )
}

export default SigninPopup