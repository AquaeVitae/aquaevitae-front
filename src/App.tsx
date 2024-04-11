import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import axios from "axios";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.API_URL || "http://127.0.0.1:8000/v1/";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
