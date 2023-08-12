import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gagModalState, loginState } from '../store/atom';
import GagModal from '../components/GagModal';
import { getLocalStorage } from '../utils/infos/loaclStorage';

interface MainButtonProps {
    name : string;
    link : string;
}

function MainButton (props: MainButtonProps){
    const {name, link} = props;
    const navigate = useNavigate();
    const LoginState = useSetRecoilState(loginState);
    const GagModalState = useSetRecoilState(gagModalState)
  
    const ButtonActive = () =>{
        if(link != ""){
            navigate(link)
        }
        else{
            getLocalStorage("username") == null || undefined ?LoginState(true) :GagModalState(true)
        }
    }

    return(<ButtonStyle onClick={() =>ButtonActive()}>
        <p>{name}</p>
    </ButtonStyle>)
}

const ButtonStyle = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(217, 217, 217);
    width: 300px;
    height: 180px;
    border-radius: 30px;
  cursor: pointer;
    p{
        font-size: 30px;
        font-weight: 800;
    }
`

export default MainButton;