import './App.css'
import Toolbar from "./UI/Toolbar/Toolbar";
import Register from "./features/users/Register";
import {Login} from "@mui/icons-material";
import {Route, Routes} from "react-router-dom";
import Home from "./container/Home/Home";

const App = () => {
  return (
      <>
        <header>
          <Toolbar/>
        </header>
        <main className="mt-5">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </main>
      </>
  )
};

export default App
