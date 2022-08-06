import UserContext from "../context/UserContext";
import styled from "styled-components";
import {useContext} from 'react';

export default function Footer(){
    const {userName} = useContext(UserContext)
    
    if(userName!== ""){
        return(
                <></>
            )
    }else{
        return(
            <Bottom>
                <h5>Crie sua conta para usar nosso serviço!</h5>
            </Bottom>
        )
    }
 
}

const Bottom = styled.div`
                        h5{
                            font-family: 'Lexend Deca', sans-serif;
                            margin-top:80px;
                            font-size:36px;
                            font-weight: 700;
                        }
`