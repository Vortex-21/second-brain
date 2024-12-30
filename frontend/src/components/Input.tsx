// export function Input({placeholder} : {placeholder:string}){
//     return (
//         <input ref={ref} className="w-3/5 px-4 py-2 m-2 border-2 border-slate-300 rounded-md" placeholder={placeholder} />



//     )
//   }

import React from "react";
export const Input = React.forwardRef((props: {placeholder:string, required?:boolean}, ref : React.ForwardedRef<HTMLInputElement>)=>{
        return (
            props.required?<input ref={ref} placeholder = {props.placeholder} className="w-3/5 px-4 py-2 m-2 border-2 border-slate-300 rounded-md" required></input>:<input ref={ref} placeholder = {props.placeholder} className="w-3/5 px-4 py-2 m-2 border-2 border-slate-300 rounded-md" ></input>
        )
})