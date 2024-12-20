import { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary", 
    text:string, 
    startIcon:ReactElement
}
const variantClasses= {
    "primary": "mr-2  bg-[#5046E4] text-white", 
    "secondary":"mr-4   bg-[#E1E6FF] text-[#5d59e0]"
}
const defaultStyles="text-1xl p-4 rounded-lg flex items-center";

export function Button({variant, text, startIcon}: ButtonProps){
    return (
        <div className={variantClasses[variant] + " " + defaultStyles}>
            {startIcon}
            {text}
        </div>
    )
}