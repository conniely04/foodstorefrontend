import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
          
    </div>
  );
}

export default App;
