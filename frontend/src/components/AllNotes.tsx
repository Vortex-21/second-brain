import { Button } from "./Button";
import { Card } from "./Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthAtom } from "../recoil/atoms/AuthAtoms";
import { useEffect } from "react";
interface contentInterface {
  content_type: "Document" | "Video" | "Tweet", 
  title: string, 
  link?:string, 
  description:string,
  tags?:string[], 
  userId:string, 
  _id: string
}
export const AllNotes = () => {
  const setModalStatus = useSetRecoilState(ModalAtom);
  const AuthStatus = useRecoilValue(AuthAtom);
  const setAuthStatus = useSetRecoilState(AuthAtom);
  useEffect(()=>{
    if(document.cookie){
      // console.log(document.cookie); 
      setAuthStatus(true);
    }
  },[])
  function addContent() {
    setModalStatus("Add");
  }

  function shareBrain() {
    setModalStatus("ShareBrain");
  }
  
  async function fetchData(){
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/content`, {withCredentials: true});
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  const {data, isLoading, error} = useQuery({queryKey: ["content"], queryFn: fetchData})
  if(isLoading){
    return (
      <div>
        <h1>Loading your Content.....</h1>
      </div>
    )
  }
  if(error){
    console.log("error: ",error);
    return (
      <div>
        <h1>Error loading your Content. Please try again later.</h1>
      </div>
    )
  }
  else{
    // console.log("data: ", data);
    return (
      AuthStatus ? 
      <div className="">
        <div className="sticky top-0 bg-[#F9FBFC] p-2 z-20">
        <div className="flex  items-center h-20">
          <h1 className="text-4xl">All Notes</h1>
  
          <div id="buttons" className="ml-auto text-2xl flex gap-5">
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              clickHandler={addContent}
            ></Button>
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
              clickHandler={shareBrain}
            ></Button>
          </div>
        </div>
  
        </div>
  
        <div id="cards" className="flex flex-wrap mt-8 gap-5 ">
          {
          data? data.Content.length>0? data.Content.map((el:contentInterface, idx: number)=>{
            return <Card id={el._id} key = {el._id} content_type={el.content_type} title={el.title} description={el.description} tags={el.tags} link={el.link}></Card>
          }):<p>No Content to load</p>:<p>You are not Logged in!</p>
         }
        </div>
      </div>:<div>
        Sign Up and see the magic begin!
        Or what are you waiting for? Log in!
      </div>
    );

  }
};
