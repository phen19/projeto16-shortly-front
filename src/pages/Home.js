import UserContext from "../context/UserContext";
import { useState, useContext, useEffect} from 'react';
import styled from "styled-components";
import axios from "axios";
import trash from "../assets/img/Vector(1).png";
import Header from "../components/Header.js";

export default function Home(){
    const { user} = useContext(UserContext);
    const {setUserName} = useContext(UserContext)
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
        const requisicao = axios.get("https://back-projeto-16-shortly.herokuapp.com/users/me", config);
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
                    <h1>{url}</h1> <h1 style={{cursor:"pointer"}}onClick={()=> goToUrl(shortUrl)}>{shortUrl}</h1> <h1>Quantidade de visitantes: {visitCount}</h1>
            </div>
            <div className="delete"> <img src={trash} alt="" onClick={() => removeUrl({id})}/></div>
            </div>
            </>
        )
    }

    function removeUrl({id}){
        const confirm = window.confirm(`Tem certeza que quer excluir este link?`)
        if(confirm){
            axios.delete(`https://back-projeto-16-shortly.herokuapp.com/urls/${id}`, {
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

    function goToUrl(shortUrl){
        const requisicao = axios.get(`https://back-projeto-16-shortly.herokuapp.com/urls/open/${shortUrl}`);
        requisicao.then((response) =>{
            window.open(response.data.split('to ')[1], "_blank")
            setRefreshAxios(!refreshAxios)
        }).catch((err => {
            console.error('deu ruim')
            console.error(err)
        }));

    }

    function buttonSuccess(url) {
       

        let data = { url:url};
        console.log(data)
        const requisicaoPost = axios.post("https://back-projeto-16-shortly.herokuapp.com/urls/shorten", data, config);
        //setLoading(true)
        requisicaoPost.then((response) => {
            setUrl("");
            setRefreshAxios(!refreshAxios);
        });
        requisicaoPost.catch((error) => {alert(error.response.data)
          //  setLoading(false)
        })
    }

    console.log(userUrls.id)

    if(userUrls.length === 1 && userUrls[0].id === null){
        return(       
        <>
        
            <Container onSubmit={(e) => buttonSuccess(url, e.preventDefault())}>
            <Header />
            <Title><p>Shortly </p><h2>🩳</h2></Title>
                <form>
                <div className="shorten">
                <input type="text" name="URL" placeholder="Links que cabem no bolso"  value= {url} onChange={(e) => setUrl(e.target.value)} required />
                <button type="submit">Encurtar Link</button> </div>
                </form>
                <div className="urls"> Você não tem links encurtados. Insira um acima!</div>
            </Container>
            
        </>

        )
    }
    return (
        <>
        
        <Container onSubmit={(e) => buttonSuccess(url, e.preventDefault())}>
        <Header />
        <Title><p>Shortly </p><h2>🩳</h2></Title>
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
            font-family: 'Lexend Deca', sans-serif;
            display:flex;
            flex-direction: column;
            align-items: center;
            background-color: #FFFFFF;
            box-sizing: border-box;
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
            }

            h2{
                font-size: 100px;
            }

            .shorten > ::placeholder{
                font-size: 14px;
                color: #9C9C9C;
                font-weight: 400;
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
            }

            h1{
                color: #FFFFFF;
                font-weight: 400;
                font-size:14px;
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

            .userUrls>h1:nth-child(2):hover{
                text-decoration: underline;
            }

            .delete{
                width:130px;
                background-color: #FFFFFF;
                display:flex;
                align-items: center;
                justify-content: center;
                border-radius: 0px 12px 12px 0px;
                box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
                border: 1px solid rgba(120, 177, 89, 0.25);
            }

            .delete>img{
                size:24px;
            }

            .urls{
                heigth: 100px;
                overflow:scroll;
            }
`

const Title = styled.div`
          display:flex;
          justify-content:center;
          align-items:center;
          text-align:center;
          margin-bottom: 140px;
          margin-top: 96px;
          box-sizing:border-box;
`