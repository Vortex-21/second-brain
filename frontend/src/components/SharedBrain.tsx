import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "./Card";
interface contentInterface {
    content_type: "Document" | "Video" | "Tweet", 
    title: string, 
    link?:string, 
    description:string,
    tags?:string[], 
    userId:string, 
    _id: string
  }
const SharedBrain = ({content_type="all"}: {content_type?: string}) => {
  const { token } = useParams();
  async function getSharedContent() {
    const response = await axios.get(
      `http://localhost:3000/api/v1/brain/${token}`,
      { withCredentials: true }
    );
    return response.data;
  }
  const {
    data: sharedData,
    isLoading,
    isError,
    error
  } = useQuery({ queryKey: ["sharedContent"], queryFn: getSharedContent });
  if (isLoading) {
    return <div>Loading Brain Content...</div>;
  } else if (isError) {
    console.log("Error loading shared content: ",error );
    return <div>Error loading shared content. Please try again later.</div>;
  } else {
    // console.log("shared content: ", sharedData); 
    return (
      <div>
        <p className="text-2xl">{sharedData.sharedBy}'s Brain : </p>
        <div id="cards" className="flex flex-wrap mt-8 gap-5 ">
          {sharedData ? (
            sharedData.content.length > 0 ? (
              sharedData.content.map((el: contentInterface, idx: number) => {
                return (
                    (content_type==="all" || el.content_type === content_type)?<Card
                    id={el._id}
                    key={el._id}
                    content_type={el.content_type}
                    title={el.title}
                    description={el.description}
                    tags={el.tags}
                    link={el.link}
                  ></Card>:null
                );
              })
            ) : (
              <p>No Content to load</p>
            )
          ) : (
            <p>You are not Logged in!</p>
          )}
        </div>
      </div>
    );
  }
};

export default SharedBrain;
