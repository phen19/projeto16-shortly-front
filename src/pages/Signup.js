import styled from "styled-components";
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import  {InfinitySpin}  from  'react-loader-spinner'
import Header from "../components/Header";

export default function Signup(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    let loadingAnimation = <InfinitySpin width='200' color="#FFFFFF" />

    function buttonSuccess(name, email, password, confirmPassword, navigate) {

        console.log(password)
        let data = {    
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
                    };
        console.log(data)
        const request = axios.post(
          "https://back-projeto-16-shortly.herokuapp.com/signup",
          data
        );
        setLoading(true)
        request.then(() => {
          navigate("/signin");
          
        });
        request.catch((error) => {
            alert(error.response.data)
            setLoading(false)
        });
    }

    return(
        <>
            <Container onSubmit={(e) => buttonSuccess(name, email, password, confirmPassword, navigate,e.preventDefault())}>
                <Header/>
                <Title><p>Shortly </p><h2>🩳</h2></Title>
                <input type="text"  placeholder="Nome" value ={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="text"  placeholder="E-mail" value ={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password"  placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type="password"  placeholder="Confirmar senha" value ={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

                <button type = "submit"> {loading ? loadingAnimation : 'Criar Conta'}</button>
                
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

            placeholder::{
                font-size: 20px;
                color: #DBDBDB;
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