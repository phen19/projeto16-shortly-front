import UserContext from "../context/UserContext";
import { useState, useContext, useEffect} from 'react';
import styled from "styled-components";
import { Link , useNavigate, useLocation} from "react-router-dom";

export default function Header(){
    const {setUser} = useContext(UserContext);
    const {userName,setUserName} = useContext(UserContext)
    const [colorSignIn, setColorSignIn] = useState("")
    const [colorSignUp, setColorSignUp] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    function logout(){
        setUser([])
        setUserName("")
        navigate("/ranking")
        console.log(userName)
    }

    useEffect(() => {
        if (location.pathname === "/signup") {
            setColorSignUp("#5D9040")
            return
        }
        
     
            setColorSignIn("#5D9040")
        

    },[]);


    if(userName!== ""){
        return(
            <>
                <Top>
                <h3>Seja bem vindo(a), {userName}!</h3>
                <Links>
                    <Link to = "/" style={{textDecoration:"none"}} >
                        <h6>Home</h6>
                    </Link>    
                    <Link to = "/ranking" style={{textDecoration:"none"}}>
                        <h6>Ranking</h6>
                    </Link>    

                        <h6 onClick={() => logout()} style={{textDecoration:"underline"}}>Sair</h6>
                   
                </Links>
                </Top>
                
            </>
        )
    } else{
        return(
            <>
                <Top style={{justifyContent:"flex-end"}}>
                <Links>
                    <Link to = "/signin" style={{textDecoration:"none"}} >
                        <h6 style={{color:`${colorSignIn}`}}>Entrar </h6>
                    </Link>    
                    <Link to = "/signup" style={{textDecoration:"none"}}>
                    <h6 style={{color:`${colorSignUp}`}}>Cadastrar-se</h6>
                    </Link>    
                   
                </Links>
                </Top>
            </>
        )
    }


}

const Top = styled.div`
                            display: flex;
                            justify-content: space-between;
                            margin-top: 70px;
                            width: 1017px;

                            h3{
                                color: #5D9040;
                                font-size: 14px;
                            }
                            `
const Links = styled.div` display:flex;

                            h6{
                                margin-right: 26px;
                                font-family: 'Lexend Deca', sans-serif;
                                font-size: 14px;
                                color: #9c9c9c;
                                font-weight: 400;
                                cursor: pointer;
                            }

                            h6:hover{
                                text-decoration:underline;
                            }
`