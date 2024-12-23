import "./index.css";
import "./App.css";
import { Brain } from "./components/Brain";
import { ModalWrapper } from "./components/ModalWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen min-h-screen">
        <Brain />
        <ModalWrapper />
      </div>
    </QueryClientProvider>
  );
}

export default App;
