import "./App.css";
import AppNavbar from "./components/Navbar/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Views/Login/login";

const queryClient = new QueryClient();

function App() {
  const token = localStorage.getItem("token");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppNavbar />
        {token ? <>Hello</> : <Login />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
