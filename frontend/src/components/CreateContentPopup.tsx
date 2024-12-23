import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";

const CreateContentPopup = () => {
  return (
    <div className="fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
      <Input placeholder="Title" onChangeHandler={()=>{}}/>
      <Input placeholder="Link" onChangeHandler={()=>{}}/>
      <Button variant="secondary" text = "Submit" clickHandler={()=>{}}></Button>
    </div>
  );
};



export default CreateContentPopup;
