import {useSetRecoilState } from "recoil"
import { ModalAtom } from "../recoil/atoms/ModalAtom"
export const Overlay = () => {
    const setModalStatus = useSetRecoilState(ModalAtom)
    function clickHandler(){
        setModalStatus("None");
    }
    return (
        <div className="bg-opacity-50 bg-slate-400 backdrop-blur-sm z-20 fixed top-0 left-0 min-h-screen w-screen" onClick={clickHandler}>
              
        </div>
    )
}

