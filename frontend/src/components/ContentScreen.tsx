import { ToastContainer } from "react-toastify";
import { AllNotes } from "./AllNotes";
import { Route, Routes } from "react-router-dom";
import { ContentFilter} from "./ContentFilter";
import SharedBrain from "./SharedBrain";

export function ContentScreen() {
  return (
    <div className="bg-[#F9FBFC] flex-1">
    <Routes>
      <Route path="/all" element={<AllNotes/>}/>
      <Route path="/tweets" element={<ContentFilter content_type="Tweet"/>}/>
      <Route path="/videos" element={<ContentFilter content_type="Video"/>}/>
      <Route path="/docs" element={<ContentFilter content_type="Document"/>}/>
      <Route path="/brain/:token" element={<SharedBrain/>}/>
      <Route path="/brain/:token/all" element={<SharedBrain/>}/>
      <Route path="/brain/:token/tweets" element={<SharedBrain content_type="Tweet"/>}/>
      <Route path="/brain/:token/videos" element={<SharedBrain content_type="Video"/>}/>
      <Route path="/brain/:token/documents" element={<SharedBrain content_type="Document"/>}/>
     

    </Routes>
    </div>
  );
}

// export default ContentScreen
