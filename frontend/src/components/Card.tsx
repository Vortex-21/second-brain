import { useEffect } from "react";
import DocumentIcon from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import Tag from "./Tag";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../utils";
import { Tweet } from 'react-tweet'



type ContentTypes = "Document" | "Video" | "Tweet";
interface CardInterface {
  content_type: ContentTypes;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  id: string;
}

export function Card({
  content_type,
  title,
  description,
  tags,
  link,
  id,
}: CardInterface) {
  

  let vidLink = content_type==="Video"?`https://www.youtube.com/embed/${link?.split("?v=")[1]}`:"";
  
  let tweetId = content_type === "Tweet"?link?.split("status/")[1] : ""; 
  const icons: { [key in ContentTypes]: JSX.Element } = {
    Document: <DocumentIcon />,
    Video: <VideoIcon />,
    Tweet: <TweetIcon />,
  };
  
  function shareLinkHandler() {
    if (link) {
      navigator.clipboard.writeText(link);
      notify("success", "Link copied to clipboard!")
    }
  }
  async function deleteCard() {
    // console.log("Deleting Card: ", title);
    console.log("id: ", id); 
    await axios.delete(`http://localhost:3000/api/v1/content/${id}`, {
      withCredentials: true,
    });
  }

  async function deleteClickHandler() {
    mutation.mutate();
    
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      // alert("Card deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["content"] });
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      notify("success", "Card deleted successfully"); 
    },
    onError: () => {
      alert("Could not delete card");
    },
  });

  return (
    <div className="hover:shadow-xl transition-all duration-300 m-4  p-4 rounded-lg  w-72 h-96 scrollbar-none overflow-y-scroll border-gray-100 border-2 flex flex-col justify-between bg-[#FFFFFF]">
      <div className="flex justify-between m-2 bg-white">
        <div className="flex">
          {icons[content_type]}
          <span className="ml-2 font-semibold">{title}</span>
        </div>

        <div className="flex w-12 justify-between">
          {content_type !== "Document" && (
            <div onClick={shareLinkHandler}>
              <ShareIcon />
            </div>
          )}
          <div
            onClick={() => {
              deleteClickHandler();
            }}
          >
            <TrashIcon />
          </div>
        </div>
      </div>

      <div className="mt-4">{description}</div>
      <div id="content_container" className="light">
        {content_type == "Video" && (
          <iframe
            className="w-full rounded-lg mt-2"
            src={vidLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {content_type == "Tweet" && (
          <Tweet id={tweetId? tweetId:"692527862369357824"} />
        )}
      </div>

      <div className="my-2 flex flex-wrap">
        {tags &&
          tags.map((el: string, idx: number) => {
            return <Tag key={idx} el={el} />;
          })}
      </div>
    </div>
  );
}
