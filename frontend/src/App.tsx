import "./index.css";
import "./App.css";
import { Brain } from "./components/Brain";
import { ModalWrapper } from "./components/ModalWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <div className="max-w-screen min-h-screen">
        <Brain />
        <ModalWrapper />
      </div>
    </QueryClientProvider>
    
    </BrowserRouter>
  );
}

export default App;
