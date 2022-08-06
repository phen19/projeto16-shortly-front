import "../assets/reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Signin from "../pages/Signin.js";
import Signup from "../pages/Signup.js";
import Ranking from "../pages/Ranking.js";
import UserContext from "../context/UserContext.js";
import { useState} from 'react';
import URLInfo from "../pages/UrlInfo.js";

export default function App() {
    const [user, setUser] = useState([])
    const [userName,setUserName] = useState("")
    const [info, setInfo] = useState("")
    return (
    <UserContext.Provider value = {{user, setUser, userName, setUserName, info, setInfo}}>
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={user.token !== undefined ? <Home/>:<Ranking/>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/signin" element={<Signin />}/>
                <Route path="/ranking" element={<Ranking/>}/>
                <Route path="/info" element={<URLInfo/>}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    );


}