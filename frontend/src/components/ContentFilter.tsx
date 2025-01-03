import { useQueryClient, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Card } from './Card';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthAtom } from '../recoil/atoms/AuthAtoms';
type ContentTypes = "Document" | "Video" | "Tweet";
interface CardInterface {
    content_type: ContentTypes;
    title: string;
    description: string;
    tags?: string[];
    link?: string;
    _id: string;
  }
export const ContentFilter = ({content_type}: {content_type: string}) => {
  const setAuthStatus = useSetRecoilState(AuthAtom); 
  useEffect(()=>{
    if(document.cookie){
      // console.log(document.cookie); 
      setAuthStatus(true);
    }
  },[])
  const AuthStatus = useRecoilValue(AuthAtom); 
  async function getContent(){
    try{
        //make the request using axios 
        const response = await axios.get(`http://localhost:3000/api/v1/content/${content_type}`, { withCredentials: true });
        return response.data;
    }
    catch(err:any){
        console.log("Error at getContent call: ", err); 
        return null;  
    }
  }

  const { data: filteredContent, isLoading, error } = useQuery({queryKey:[`${content_type.toLowerCase()}s`], queryFn:getContent});
  if(isLoading){
    return <div>Loading your {content_type.toLowerCase()}s.....</div>
  } 
  else if(error){
    console.log(`Error loading ${content_type.toLowerCase()}s: `, error);
    return <div>Error loading {content_type.toLowerCase()}s. Please try again later.</div>
  }
  else{
      console.log("filtered content: ", filteredContent);
      
      return (
        
           
        AuthStatus?filteredContent?.content.length>0?<div id={`cards-${content_type.toLowerCase()}`} className="flex flex-wrap mt-8 gap-5 ">
            {filteredContent?.content.map((el: CardInterface, idx: number)=>{
                return <Card key={idx} content_type={el.content_type} title={el.title} description={el.description} id={el._id} link={el.link}/>
            })}
        </div>:<p>No Content to Load!</p>:<p>
        Sign Up and see the magic begin!
        Or what are you waiting for? Log in!
      </p>
      )
  }
}

// export default Tweets