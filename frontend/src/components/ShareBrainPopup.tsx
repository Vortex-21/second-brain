import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { notify } from '../utils';
import Dropdown from './Dropdown';
import { Button } from './Button';
import { Input } from './Input';

const ShareBrainPopup = ({shareLink}:{shareLink?:string}) => {
  // async function getShareLink(){
  //   const response = await axios.post("http://localhost:3000/api/v1/brain/share",{},  {withCredentials: true})
  //   return response.data;
  // }
  // const mutation = useMutation({mutationFn:getShareLink, 
  //   onSuccess: (data) => {
  //     // console.log("Shared brain link: ", data);
  //     navigator.clipboard.writeText(data.shareLink);
  //     notify("success", "Link Copied to Clipboard!")
  //   }, 
  //   onError: (err) => {
  //     console.log("Error sharing brain: ", err);
  //   }
  // })

  async function handleShareBrain(){
    // mutation.mutate(); 
    navigator.clipboard.writeText(shareLinkState); 
    notify("success", "Link Copied to Clipboard!")
  }
  const [shareLinkState, setShareLinkState] = useState(""); 
  const linkRef = useRef<HTMLInputElement>(null); 
  return (
    
    <div  className="flex flex-col items-center justify-center gap-5 fixed bg-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 size-2/5 z-40">
        <Dropdown setShareLinkState={setShareLinkState}/>
        {shareLinkState&&<div className="flex flex-col items-center justify-center gap-5">
          <input className='w-full px-4 py-2 m-2 border-2 border-slate-300 rounded-md' value={shareLinkState}/>
          
          <Button variant='secondary' text="Copy Link" clickHandler={handleShareBrain}/>
          {/* <button className="" onClick={handleShareBrain}>Copy Link</button> */}

        </div>}

    </div>
    

  )
}

export default ShareBrainPopup