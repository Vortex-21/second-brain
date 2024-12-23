import DocumentIcon from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import Tag from "./Tag";

interface CardInterface {
  content_type: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}


export function Card({
  content_type ,
  title,
  description,
  tags ,
  link
}: CardInterface) {
  let vidLink="https://www.youtube.com/embed/";
  let tweetLink="https://twitter.com/username/status/";
  if(content_type == "Video"){
    vidLink += link.split("?v=")[1];
  }
  if(content_type == "Tweet"){
    tweetLink += "https://twitter.com/username/status/" + link.split("status/")[1];
  }
  return (
    <div className="hover:shadow-xl transition-all duration-300 m-4  p-4 rounded-lg  min-w-64s max-w-72 min-h-60 max-h-96 scrollbar-none overflow-y-scroll border-gray-100 border-2 flex flex-col justify-between bg-[#FFFFFF]">
      
      <div className="flex justify-between m-2">
        <div className="flex">
          {content_type=="Video" && <VideoIcon />}
          {content_type=="Tweet" && <TweetIcon />}
          {content_type=="Document" && <DocumentIcon />}
          <span className="ml-2 font-semibold">{title}</span>
        </div>
        <div className="flex w-12 justify-between">
          <ShareIcon />
          <TrashIcon />
        </div>
      </div>
      <div className="mt-4">{description}</div>
      <div>
      {content_type=="Video" && <iframe className="w-full rounded-lg mt-2" /*src="https://www.youtube.com/embed/VA7gIdsUZ0Y"*/ src={vidLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
      
      {content_type=="Tweet" && <blockquote className="twitter-tweet">
        <a /*href="https://twitter.com/username/status/1869311029131596262"*/ href={tweetLink}></a>
      </blockquote>}
       

      </div>

      <div className="my-2 flex flex-wrap">
        {tags.map((el: string, idx:number) => {
          return <Tag key={idx} el={el} />;
        })}
      </div>
    </div>
  );
}
