import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Signin from "./Signin.js";
import Signup from "./Signup.js";
import Ranking from "./Ranking.js";
import UserContext from "./UserContext.js";
import { useState} from 'react';

export default function App() {
    const [user, setUser] = useState([])

    return (
    <UserContext.Provider value = {{user, setUser}}>
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/signin" element={<Signin />}/>
                <Route path="/ranking" element={<Ranking/>}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    );


}