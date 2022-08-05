import styled from "styled-components";
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import  {InfinitySpin}  from  'react-loader-spinner'

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
        const requisicaoPost = axios.post(
          "http://localhost:4001/signup",
          data
        );
        setLoading(true)
        requisicaoPost.then(() => {
          navigate("/signin");
          
        });
        requisicaoPost.catch((error) => {
            alert(error.response.data)
            setLoading(false)
        });
    }

    return(
        <>
            <Container onSubmit={(e) => buttonSuccess(name, email, password, confirmPassword, navigate,e.preventDefault())}>
                <p>Shortly 🩳</p>
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
            font-family: 'Lexand Deca', sans-serif;
            display:flex;
            flex-direction: column;
            align-items: center;
            background-color: #E5E5E5;
           
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
            }

            p{
                font-family: 'Lexand Deca', sans-serif;
                font-size: 64px;
                margin-top: 96px;
                margin-bottom: 140px;
            }

            placeholder::{
                font-size: 20px;
                color: #DBDBDB;
               
            }
            button{
                width:182px;
                height: 60px;
                background-color:#5D9040;
                border-radius: 5px;
                border:0;
                font-size: 14px;
                font-weight: 700;
                color: #FFFFFF;
                margin-bottom: 6px;
                display:flex;
                justify-content:center;
                align-items: center;
                margin-top: 60px;
            }

            h1{
                margin-top: 36px;
                color: #FFFFFF;
                font-weight: 700;
            }
`