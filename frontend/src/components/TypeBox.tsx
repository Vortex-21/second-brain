import SignInIcon from "../icons/SignInIcon";
import { SignUpIcon } from "../icons/SignUpIcon";
import { SideBarItem } from "./SIdeBarItem";
import { ModalAtom } from "../recoil/atoms/ModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SignoutIcon } from "../icons/SignoutIcon";
import axios from "axios";
import { AuthAtom } from "../recoil/atoms/AuthAtoms";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function TypeBox() {
  const navigate = useNavigate();

  const handleRedirect = (content_type: string) => {
    navigate(`/${content_type}`); 
  };

  const setModalStatus = useSetRecoilState(ModalAtom);
  const setAuthStatus = useSetRecoilState(AuthAtom);
  const AuthStatus = useRecoilValue(AuthAtom);
  const notify = (status: string, message: string) => {
    if (status === "success")
      toast.success(message, {
        position: "bottom-left",
      });

    if (status === "error")
      toast.error(message, {
        position: "bottom-left",
      });
  };
  async function signout() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/signout", {
        withCredentials: true,
      });
      setAuthStatus(false);
      notify("success", "Logged out!");
    } catch (err: any) {
      console.log("err: ", err);
      notify("error", "Failed to log out!");
    }
  }
  return (
    <div className="mt-8 ml-8 text-xl text-gray-600">
      <SideBarItem
        icon={<i className="mr-6 fa-solid fa-folder-open"></i>}
        text="All Content"
        onClickHandler={()=>{handleRedirect("all")}}
      />
      <SideBarItem
        icon={<i className="mr-6 fa-brands fa-twitter"></i>}
        text="Tweets"
        onClickHandler={()=>{handleRedirect("tweets")}}
      />
      <SideBarItem
        icon={<i className="mr-6 fa-solid fa-video"></i>}
        text="Videos"
        onClickHandler={()=>{handleRedirect("videos")}}
      />
      <SideBarItem
        icon={<i className="mr-8 fa-solid fa-file"></i>}
        text="Documents"
        onClickHandler={()=>{handleRedirect("docs")}}
      />
      
      {AuthStatus === false && (
        <SideBarItem
          onClickHandler={() => {
            setModalStatus("Signup");
          }}
          icon={<SignUpIcon />}
          text="Sign Up"
        />
      )}
      {AuthStatus === false && (
        <SideBarItem
          onClickHandler={() => {
            setModalStatus("Signin");
          }}
          icon={<SignInIcon />}
          text="Sign In"
        />
      )}
      {AuthStatus === true && (
        <SideBarItem
          onClickHandler={signout}
          icon={<SignoutIcon />}
          text="Log out"
        />
      )}
      
    </div>
  );
}
