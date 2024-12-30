import React, { useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface contentInterface {
  content_type: "Document" | "Video" | "Tweet", 
  title: string, 
  link?:string, 
  description?:string,
  tags?:string[], 
}
const CreateContentPopup = () => {
  const queryClient = useQueryClient();
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null); 
  const typeRef = useRef<HTMLInputElement>(null); 
  const descriptionRef = useRef<HTMLTextAreaElement>(null); 
  
  async function addContent(data:contentInterface){
    const response = await axios.post("http://localhost:3000/api/v1/content", data, {withCredentials:true});
    return response.data;
  }

  const mutation = useMutation({mutationFn: addContent, 
    onSuccess: ()=>{
      console.log("Content added to brain!")
      queryClient.invalidateQueries({queryKey: ["content"]});  
    }, 
    onError:(err: any)=>{
      console.log("Error at adding content : ", err);
      alert("Error adding content. Please try again later.")
    }
  })


  async function onClickHandler(){
    if(!typeRef.current){
      alert("Please select a content type.")
      return;
    }
    if(!titleRef.current){
      alert("Please enter a title.")
      return;
    }
    if(typeRef.current && !["Document", "Video", "Tweet"].includes(typeRef.current.value)){
      alert("Invalid content type. Please choose from Document, Video, or Tweet.")
      return;
    }
    const data:contentInterface = {
      content_type: typeRef.current.value as "Document"|"Video"| "Tweet", 
      title: titleRef.current?.value, 
      description: descriptionRef.current?.value,
      link:linkRef.current?.value, 
    };

    mutation.mutate(data);
  }
  
  return (
    <div className="fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
      <Input ref = {typeRef} placeholder="Content Type" required={true}/>
      <Input ref = {titleRef} placeholder="Title" required={true}/>
      <Input ref = {linkRef} placeholder="Link"/>
      {/* <Input ref = {linkRef} placeholder="Description"/> */}
      <textarea name="" id="" placeholder="Description" ref={descriptionRef} className="w-3/5 border-2 border-slate-300 rounded-md"></textarea>
      {/* <Input ref = {linkRef} placeholder="Link"/> */}
      <Button variant="secondary" text = "Submit" clickHandler={onClickHandler}></Button>
    </div>
  );
};



export default CreateContentPopup;
