import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header.js";
import Footer from "../components/Footer";

export default function Ranking(){
    const [ranking, setRanking] = useState([])
    const {user} = useContext(UserContext)

    useEffect(() => {
        const requisicao = axios.get(`https://back-projeto-16-shortly.herokuapp.com/ranking`);
        requisicao.then((response) =>{
            
            setRanking(response.data)
        }).catch((err => {
            console.error('deu ruim')
            console.error(err)
        }));
    },[]);

    function Rank({name, linksCount, visitCount, id}){
        return(
            <>
                <h3>{id}. {name} - {linksCount} links - {visitCount} visualizações</h3> 
            </>
        )
    }

    console.log(user)
    return (
        <>
        
        <Container>
        <Header/>
            <Title><p>Shortly </p> <h2>🩳</h2></Title>
            <h1>🏆 Ranking</h1>
          <div className="ranking">
          {ranking.map((rank, index) => {return(
                    <Rank key={rank.id} name={rank.name} linksCount={rank.linksCount} visitCount={rank.visitCount} id={index+1}/>
                    )})}
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

            .ranking{
                width: 1017px;
                height: 241px;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(120, 177, 89, 0.25);
                box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
                border-radius: 24px 24px 0px 0px;
                padding-left: 40px;
                overflow:scroll;
                box-sizing:border-box;
                padding-top:20px;
                padding-bottom:30px;

            }

          .ranking>h3{
            font-family: 'Lexend Deca', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
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