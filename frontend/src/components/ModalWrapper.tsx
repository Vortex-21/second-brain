import React from 'react'
import { Overlay } from './Overlay'
import { useRecoilValue } from 'recoil';
import { ModalAtom } from '../recoil/atoms/ModalAtom';
import CreateContentPopup from './CreateContentPopup';
import ShareBrainPopup from './ShareBrainPopup';
import SignupPopup from './SignupPopup';
import SigninPopup from './SigninPopup';
import { ModalTypes } from '../ModalTypes';
import {LoaderModal} from './LoaderModal';

const popup: {[key in  ModalTypes]: JSX.Element|null} = {
  "Add":<CreateContentPopup/>, 
  "ShareBrain":<ShareBrainPopup/>, 
  "Signup":<SignupPopup/>, 
  "Signin":<SigninPopup/>,
  "None":null,
  "Loader":<LoaderModal/> 
}
export const ModalWrapper = () => {
  const modalStatus: ModalTypes = useRecoilValue(ModalAtom);
  if(modalStatus === "None")return null;
  return (
    <>
        <Overlay/>
        {popup[modalStatus]}
    </>
  )
}

