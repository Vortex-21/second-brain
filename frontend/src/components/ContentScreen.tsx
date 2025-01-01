import { ToastContainer } from "react-toastify";
import { AllNotes } from "./AllNotes";

export function ContentScreen() {
  return (
    <div className="bg-[#F9FBFC] flex-1">
       <ToastContainer/> 
      <AllNotes />
    </div>
  );
}

// export default ContentScreen
