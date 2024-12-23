import SignInIcon from '../icons/SignInIcon';
import { SignUpIcon } from '../icons/SignUpIcon';
import { SideBarItem } from './SIdeBarItem';
import { ModalAtom } from '../recoil/atoms/ModalAtom';
import { useSetRecoilState } from 'recoil';
export function TypeBox() {
    const setModalStatus = useSetRecoilState(ModalAtom);
    
    return (
      <div className="mt-8 ml-8 text-xl text-gray-600">
        
        <SideBarItem icon={<i className="mr-6 fa-brands fa-twitter"></i>} text="Tweets"/>
        <SideBarItem icon={<i className="mr-6 fa-solid fa-video"></i>} text="Videos"/>
        <SideBarItem icon={<i className="mr-8 fa-solid fa-file"></i>} text="Documents"/>
        <SideBarItem icon={<i className="mr-5 fa-solid fa-link"></i>} text="Links"/>
        <SideBarItem icon={<i className="mr-7 fa-solid fa-tag"></i>} text="Tags"/>
        <SideBarItem onClickHandler={()=>{setModalStatus("Signup")}} icon={<SignUpIcon/>} text="Sign Up"/>
        <SideBarItem onClickHandler={()=>{setModalStatus("Signin")}} icon={<SignInIcon/>} text="Sign In"/>
        {/* <div className="flex flex-col gap-4">
        <Button variant="secondary" text="Sign up" startIcon={<SignUpIcon/>} clickHandler={()=>{}}/>
        <Button variant="secondary" text="Sign up" clickHandler={()=>{}}/>

        </div> */}
      </div>
    );
  }

  