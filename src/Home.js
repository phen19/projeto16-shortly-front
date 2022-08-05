import UserContext from "./UserContext";
import { useState, useContext, useEffect} from 'react';
import styled from "styled-components";
import axios from "axios";
import trash from './img/Vector(1).png'

export default function Home(){
    const { user, setUser } = useContext(UserContext);
    const [userName,setUserName] = useState("")
    const [userUrls, setUserUrls] = useState([]);
    const [url, setUrl] = useState("");
    const [refreshAxios, setRefreshAxios] = useState(false)
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}` //Padrão da API (Bearer Authentication)
        }
      }

      useEffect(() => {
        if (user !== undefined) {
        const requisicao = axios.get("http://localhost:4001/users/me", config);
        requisicao.then((response) =>{
                setUserName(response.data.name);
                setUserUrls(response.data.shortenedUrls)
        })};

    },[refreshAxios, user]);


    function GetUrls({url, shortUrl, visitCount, id}){
        return(
            <>
            <div className="line">
            <div className="userUrls">
                    <h1>{url}</h1> <h1 onClick={()=> goToUrl({shortUrl})}>{shortUrl}</h1> <h1>Quantidade de visitantes: {visitCount}</h1>
            </div>
            <div className="delete"> <img src={trash} alt="" onClick={() => removeUrl({id})}/></div>
            </div>
            </>
        )
    }

    function removeUrl({id}){
        const confirm = window.confirm(`Tem certeza que quer excluir este link?`)
        if(confirm){
            axios.delete(`http://localhost:4001/urls/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                  }
                }).then(res =>{
                    setRefreshAxios(!refreshAxios)
                }).catch(err => {
                console.error('Não foi possível apagar mensagem!');
                console.error(err);
              });
        }
    }

    function goToUrl({shortUrl}){
        const requisicao = axios.get(`http://localhost:4001/urls/open/${shortUrl}`);
        requisicao.then((response) =>{
            window.open(response.data.url.split('to ')[1], "_blank")
            setRefreshAxios(!refreshAxios)
        });

    }

    function buttonSuccess(url) {
       

        let data = { url:url};
        console.log(data)
        const requisicaoPost = axios.post("http://localhost:4001/urls/shorten", data, config);
        //setLoading(true)
        requisicaoPost.then((response) => {
            setUrl("");
            setRefreshAxios(!refreshAxios);
        });
        requisicaoPost.catch((error) => {alert(error.response.data)
          //  setLoading(false)
        })
    }

    return (
        <>
        <p> olá {userName}</p>
        <Container onSubmit={(e) => buttonSuccess(url, e.preventDefault())}>
            <p>Shortly 🩳</p>
            <form>
            <div className="shorten">
            <input type="text" name="URL" placeholder="Links que cabem no bolso"  value= {url} onChange={(e) => setUrl(e.target.value)} required />
            <button type="submit">Encurtar Link</button> </div>
            </form>
            <div className="urls">{userUrls.map(({url, shortUrl, visitCount, id}) => {return(
                    <GetUrls key={id} url={url} shortUrl={shortUrl} visitCount={visitCount} id={id} />
            )})}</div>
        </Container>
        
    </>
    )
    
}

const Container = styled.div `
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
            }

            h1{
                color: #FFFFFF;
                font-weight: 400;
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

            .userUrls{
                width: 887px;
                height: 60px;
                display: flex;
                background-color: #80CC74;
                justify-content: space-between;
                text-align:center;
                align-items: center;
                border-radius: 12px 0px 0px 12px;
                box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
                padding-left: 22px;
                padding-right: 94px;
                box-sizing: border-box;
            }

            .userUrls>p{
                font-size:14px;
            }

            .delete{
                width:130px;
                background-color: #FFFFFF;
                display:flex;
                align-items: center;
                justify-content: center;
                border-radius: 0px 12px 12px 0px;
                box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
            }

            .delete>img{
                size:24px;
            }

            .urls{
                heigth: 100px;
                overflow:scroll;
            }
`