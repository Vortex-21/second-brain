export function Input({placeholder, val, onChangeHandler} : {placeholder:string, val: string | number, onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>)=>void}){
    return (
        <input className="w-3/5 px-4 py-2 m-2 border-2 border-slate-300 rounded-md" placeholder={placeholder} onChange = {(e)=>{onChangeHandler(e)}} value={val}/>
      
    )
  }