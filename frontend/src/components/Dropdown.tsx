import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { notify } from "../utils";

const Dropdown = ({setShareLinkState}:{setShareLinkState:Function}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an access option");

  async function getShareLink(){
    const response = await axios.post("http://localhost:3000/api/v1/brain/share",{},  {withCredentials: true})
    return response.data;
  }

  const mutation = useMutation({mutationFn:getShareLink, 
    onSuccess: (data) => {
      // console.log("Shared brain link: ", data);
    //   navigator.clipboard.writeText(data.shareLink);
    //   notify("success", "Link Copied to Clipboard!")
    setShareLinkState(data.shareLink); 
}, 
onError: (err) => {
    console.log("Error sharing brain: ", err);
    notify("error", "Couldn't create a shareable link. Please try again :("); 
}
})

async function handleShareBrain(){
    mutation.mutate(); 
}  



const toggleDropdown = () => setIsOpen(!isOpen);
const selectOption = (option: any) => {
    setSelected(option);
    setIsOpen(false);
      handleShareBrain();
    

  };

  const options = ["View Only"];

  return (
    <div className="relative inline-block w-64">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
      >
        {selected}
        {isOpen===false?<span className="ml-2">&#9660;</span>:<span className="ml-2">&#9650;</span>}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => selectOption(option)}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
