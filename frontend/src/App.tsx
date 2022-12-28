import "./App.css";
import AppNavbar from "./components/Navbar/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Router from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Router />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
