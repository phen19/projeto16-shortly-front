import UserContext from "../context/UserContext";
import { useContext, useState} from 'react';
import styled from "styled-components";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import axios from "axios";


export default function URLInfo(){
    const {info, userName} = useContext(UserContext)
    const [refreshAxios, setRefreshAxios] = useState(false)

    function goToUrl(shortUrl){
        const request = axios.get(`https://back-projeto-16-shortly.herokuapp.com/urls/open/${shortUrl}`);
        request.then((response) =>{
            window.open(response.data.split('to ')[1], "_blank")
            setRefreshAxios(!refreshAxios)
        }).catch((err => {
            console.error('deu ruim')
            console.error(err)
        }));

    }

    console.log(info)
    if (userName!==""){
        return(
            <>
            
            <Container>
            <Header/>
                <Title><p>Shortly </p> <h2>🩳</h2></Title>
                <h1>Informações URL</h1>
              <div className="info">
                <h3>ID</h3>
                <h4>{info.data.id}</h4>
                <h3> URL</h3>
                <h4>{info.data.url}</h4>
                <h3>URL encurtada</h3>
                <h4 style={{cursor:"pointer", textDecoration:"underline", color:"blue"}}onClick={()=> goToUrl(info.data.shortUrl)}>{info.data.shortUrl}</h4>
                <h3>Visitantes</h3>
                <h4>{info.count}</h4>
              </div>
                <Footer/>
            </Container>
            
        </>
        )
    }

    return(
        <>
            
        <Container>
        <Header/>
            <Title><p>Shortly </p> <h2>🩳</h2></Title>
            <h1>Informações URL</h1>
          <div className="info">
            <h3>Entre no nosso serviço e selecione um link encurtado para obter maiores informações da URL.</h3>
          </div>
            <Footer/>
        </Container>
        
    </>
    )

}

const Container = styled.div `
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
            }

            p{
                font-family: 'Lexend Deca', sans-serif;
                font-size: 64px;
                font-weight: 200;
                display:flex;
                text-align: center;
                align-items: center;
            }

            h2{
                font-size: 100px;
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
            }

            h1{
                font-family: 'Lexend Deca', sans-serif;
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 50px;
            }

            .shorten{
                width: 1017px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 60px;
            }

            .line{
                width: 1017px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 42px;
            }

            .info{
                width: 1017px;
                height: 241px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid rgba(120, 177, 89, 0.25);
                box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
                border-radius: 24px 24px 0px 0px;
                padding-left: 40px;
                overflow:scroll;
                box-sizing:border-box;

            }

          .info>h3{
            font-family: 'Lexend Deca', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            margin-bottom:12px;
            text-align: center;
          }

          .info>h4{
            font-family: 'Lexend Deca', sans-serif;
            font-style: normal;
            font-weight: 200;
            font-size: 14px;
            margin-bottom:12px;
          }

`
const Title = styled.div`
          display:flex;
          justify-content:center;
          align-items:center;
          text-align:center;
          margin-top: 96px;
          margin-bottom: 80px;
          box-sizing:border-box;
`