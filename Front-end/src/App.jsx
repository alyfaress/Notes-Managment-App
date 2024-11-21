import Home from './Home';
import Login from './Login';
import Signup from './signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div >
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Signup/>} />
          <Route path="/Signup" element ={<Signup/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
