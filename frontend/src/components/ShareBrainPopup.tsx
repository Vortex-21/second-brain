import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { notify } from '../utils';

const ShareBrainPopup = () => {
  async function getShareLink(){
    const response = await axios.post("http://localhost:3000/api/v1/brain/share",{},  {withCredentials: true})
    return response.data;
  }
  const mutation = useMutation({mutationFn:getShareLink, 
    onSuccess: (data) => {
      // console.log("Shared brain link: ", data);
      navigator.clipboard.writeText(data.shareLink);
      notify("success", "Link Copied to Clipboard!")
    }, 
    onError: (err) => {
      console.log("Error sharing brain: ", err);
    }
  })

  async function handleShareBrain(){
    mutation.mutate(); 
  }
  return (
    <div  className="fixed bg-[red] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 size-2/5 z-40">
        <button onClick={handleShareBrain}>Copy Link</button>
    </div>
  )
}

export default ShareBrainPopup