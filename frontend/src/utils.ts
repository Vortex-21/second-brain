import { toast } from "react-toastify";

export function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>, setFunction: Function): void{
    setFunction(e.target.value);
}

export const notify = (status:string, message: string)=>{
      if(status === "success")toast.success(message, {
        position: "bottom-left"
      })

      if(status === "error")toast.error(message, {
        position: "bottom-left"
      })
    }