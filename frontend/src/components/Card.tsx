import DocumentIcon from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import Tag from "./Tag";

interface CardInterface {
  type: "Document" | "Video" | "Tweet";
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const defaultClasses = "";
export function Card({
  type = "Document",
  title = "Project Ideas",
  description = "This is my new project using React whick looks awesome",
  tags = ["productivity", "work", "asdassd", "asdsassda"],
  link
}: CardInterface) {
  if(type == "Video"){
    link = "https://www.youtube.com/embed/" + link.split("?v=")[1];
  }
  return (
    <div className=" m-4  p-4 rounded-lg  min-w-64s max-w-72 min-h-60 max-h-96 scrollbar-none overflow-y-scroll border-gray-100 border-2 flex flex-col justify-between bg-[#FFFFFF]">
      
      <div className="flex justify-between m-2">
        <div className="flex">
          {type=="Video" && <VideoIcon />}
          {type=="Tweet" && <TweetIcon />}
          {type=="Document" && <DocumentIcon />}
          <span className="ml-2 font-semibold">{title}</span>
        </div>
        <div className="flex w-12 justify-between">
          <ShareIcon />
          <TrashIcon />
        </div>
      </div>
      <div className="mt-4">{description}</div>
      <div>
      {type=="Video" && <iframe className="w-full rounded-lg mt-2" /*src="https://www.youtube.com/embed/VA7gIdsUZ0Y"*/ src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
      
      {type=="Tweet" && <blockquote className="twitter-tweet">
        <a /*href="https://twitter.com/username/status/1869311029131596262"*/ href={link}></a>
      </blockquote>}
       

      </div>

      <div className="my-2 flex flex-wrap">
        {tags.map((el: string) => {
          return <Tag el={el} />;
        })}
      </div>
    </div>
  );
}
