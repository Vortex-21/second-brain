export function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>, setFunction: Function): void{
    setFunction(e.target.value);
}