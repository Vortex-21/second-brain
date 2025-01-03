import { ToastContainer } from "react-toastify";
import { AllNotes } from "./AllNotes";
import { Route, Routes } from "react-router-dom";
import { ContentFilter} from "./ContentFilter";

export function ContentScreen() {
  return (
    <div className="bg-[#F9FBFC] flex-1">
    <Routes>
      <Route path="/all" element={<AllNotes/>}/>
      <Route path="/tweets" element={<ContentFilter content_type="Tweet"/>}/>
      <Route path="/videos" element={<ContentFilter content_type="Video"/>}/>
      <Route path="/docs" element={<ContentFilter content_type="Document"/>}/>
      {/* <Route path="/videos" element={<Videos/>}/>
      <Route path="/videos" element={<Docs/>}/>
      <Route path="/links" element={<Links/>}/> */}
       {/* <ToastContainer/>  */}
      {/* <AllNotes /> */}

    </Routes>
    </div>
  );
}

// export default ContentScreen
