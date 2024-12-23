import React from 'react'
import { Overlay } from './Overlay'
import { useRecoilValue } from 'recoil';
import { ModalAtom } from '../recoil/atoms/ModalAtom';
import CreateContentPopup from './CreateContentPopup';
import ShareBrainPopup from './ShareBrainPopup';
import SignupPopup from './SignupPopup';
import SigninPopup from './SigninPopup';

export const ModalWrapper = () => {
  const modalStatus = useRecoilValue(ModalAtom);
  if(modalStatus === "None")return null;
  return (
    <>
        <Overlay/>
        {modalStatus === "Add" && <CreateContentPopup/>}
        {modalStatus === "ShareBrain" && <ShareBrainPopup/>}
        {modalStatus === "Signup" && <SignupPopup/>}
        {modalStatus === "Signin" && <SigninPopup/>}
    </>
  )
}

