import { useQueryClient, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Card } from './Card';
import axios from 'axios';
type ContentTypes = "Document" | "Video" | "Tweet";
interface CardInterface {
    content_type: ContentTypes;
    title: string;
    description: string;
    tags?: string[];
    link?: string;
    id: string;
  }
export const ContentFilter = ({content_type}: {content_type: string}) => {
  // useEffect(()=>{
  //   if (content_type === "Tweet" && window.twttr?.widgets) {
  //       window.twttr.widgets.load();
  //   }
  // }, [])
 
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
    return <div>Loading your tweets.....</div>
  } 
  else if(error){
    console.log(`Error loading ${content_type.toLowerCase()}s: `, error);
    return <div>Error loading {content_type.toLowerCase()}s. Please try again later.</div>
  }
  else{
      console.log("filtered content: ", filteredContent);
      return (
        
           
        <div id={`cards-${content_type.toLowerCase()}`} className="flex flex-wrap mt-8 gap-5 ">
            {filteredContent?.content.map((el: CardInterface, idx: number)=>{
                return <Card key={idx} content_type={el.content_type} title={el.title} description={el.description} id={el.id} link={el.link}/>
            })}
        </div>
      )
  }
}

// export default Tweets