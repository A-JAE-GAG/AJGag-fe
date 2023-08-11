import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { loginState } from '../../store/atom';

function Header (){

    const navigate = useNavigate();
    const Loginstate = useSetRecoilState(loginState)

    return(<HeaderBox>
<h3>ㅇㅈ개그</h3>
<h4 onClick={()=> Loginstate(true)}>로그인/회원가입</h4>

    </HeaderBox>)
}

export default Header;

const SignInUpBox = styled.div`
    
`

const HeaderBox = styled.div`
position: fixed;
left: 0%;
top: 0%;
background-color: rgba(111, 168, 255, 1);
width: 100vw;
height: 60px;
  padding: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
h3{
  margin: 0px;
  padding: 0px 0px 0px 10px;
  font-size: 35px;
  color: white;
}
h4{
cursor: pointer;
  margin: 0px;
  padding: 0px 40px 0px 0px;
  font-size: 25px;
  color: white;
}
`