import {ReactElement} from "react"
export function SideBarItem({icon, text, onClickHandler=()=>{}}: {icon:ReactElement, text:string, onClickHandler?:Function}){
    return (
      <div onClick={()=>{onClickHandler()}} className="mb-6 cursor-pointer hover:bg-[#E1E6FF] p-2 rounded-md transition-all duration-300 flex items-center">
          {icon}
          {text}
          
        </div>
    )
  }