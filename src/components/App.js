import "../assets/reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Signin from "../pages/Signin.js";
import Signup from "../pages/Signup.js";
import Ranking from "../pages/Ranking.js";
import UserContext from "../context/UserContext.js";
import { useState} from 'react';

export default function App() {
    const [user, setUser] = useState([])
    const [userName,setUserName] = useState("")
    return (
    <UserContext.Provider value = {{user, setUser, userName, setUserName}}>
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={user.token !== undefined ? <Home/>:<Ranking/>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/signin" element={<Signin />}/>
                <Route path="/ranking" element={<Ranking/>}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    );


}