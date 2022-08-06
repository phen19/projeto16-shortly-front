import styled from "styled-components";
import { useState, useContext} from 'react';
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  {InfinitySpin}  from  'react-loader-spinner'
import Header from "../components/Header";

export default function Signin(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    let loadingAnimation = <InfinitySpin width='200' color="#FFFFFF" />

    function buttonSuccess(email, password, user, setUser, navigate) {
        console.log(password)

        let data = { email: email, password: password};
        console.log(data)
        const requisicaoPost = axios.post(
          "https://back-projeto-16-shortly.herokuapp.com/signin",
          data
        );
        setLoading(true)
        requisicaoPost.then((response) => {
            setUser(response.data);
            navigate("/");
        });
        requisicaoPost.catch((error) => {alert(error.response.data)
            setLoading(false)
        })
    }

    return(
        <>
            <Container onSubmit={(e) => buttonSuccess(email, password, user, setUser, navigate, e.preventDefault())}>
                <Header/>
                <Title><p>Shortly </p><h2>🩳</h2></Title>

                <input type="text"  placeholder="E-mail" value ={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password"  placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>


                <button type = "submit"> {loading ? loadingAnimation : 'Entrar'}</button>
                
            </Container>
        </>
    )
}

            const Container = styled.form `
            font-family: 'Lexend Deca', sans-serif;
            display:flex;
            flex-direction: column;
            align-items: center;
            background-color: #FFFFFF;
           
            height: 100vh;
            width: 100vw;

            input{
            width:769px;
            height: 60px;
            margin-bottom: 13px;
            box-sizing: border-box;
            border: 1px solid rgba(120, 177, 89, 0.25);
            box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
            border-radius: 12px;
            padding-left: 20px;
            font-family: 'Lexend Deca', sans-serif;
            }

            p{
                font-family: 'Lexend Deca', sans-serif;
                font-size: 64px;
                font-weight:200;
            }

            h2{
                font-size: 100px;
            }

            ::placeholder{
                font-size: 20px;
                color: #9c9c9c;
                font-family: 'Lexend Deca', sans-serif;
            }
            button{
                width:182px;
                height: 60px;
                background-color:#5D9040;
                border-radius: 12px;
                border:0;
                font-size: 14px;
                font-weight: 700;
                color: #FFFFFF;
                margin-bottom: 6px;
                display:flex;
                justify-content:center;
                align-items: center;
                margin-top: 60px;
                font-family: 'Lexend Deca', sans-serif;
            }

            h1{
                margin-top: 36px;
                color: #FFFFFF;
                font-weight: 700;
            }
`
const Title = styled.div`
          display:flex;
          justify-content:center;
          align-items:center;
          text-align:center;
          margin-bottom: 140px;
          margin-top: 96px;
`