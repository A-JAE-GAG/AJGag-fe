import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { gagModalState, loginState } from '../../store/atom';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/infos/loaclStorage';
import { getCookie, removeCookie } from '../../utils/infos/cookie';
import GagModal from '../GagModal';
import LoginModal from '../LoginModal';

function Header (){

    const navigate = useNavigate();
    const Loginstate = useSetRecoilState(loginState)
    const nickname = getLocalStorage("username")
    const LoginState = useRecoilValue(loginState);
    const GagModalState = useRecoilValue(gagModalState);

    useEffect(()=>{
        if(getCookie("token") == null || undefined && nickname !== null){
            removeLocalStorage("username");
        }
        if(getLocalStorage("solvedList") == null || undefined){
          setLocalStorage("solvedList", [])
        }
        
    }, [getCookie("token")])
    const onLogout = () => {
        removeCookie("token");
        removeLocalStorage("username");
        navigate("/");
        window.location.reload();
      };
    

    return(<>
      <HeaderBox>
      <h3 onClick={() => {navigate("/");}}>ㅇㅈ개그</h3>
      {nickname !== null
      ? <NameBox>
        <h5 onClick={()=>{navigate("/Profile")}}>{nickname}님 환영합니다!</h5>
        <h5 onClick={() => onLogout()}>로그아웃</h5>
        </NameBox>
      : <h4 onClick={()=> Loginstate(true)}>로그인/회원가입</h4>}
      </HeaderBox>
      {GagModalState === true && <GagModal/>}
      {LoginState === true && <LoginModal />}
    </>)
}

export default Header;

const NameBox = styled.div`
    display: flex;
    justify-content: center;
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
  cursor : pointer;
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
h5{
cursor: pointer;
  margin: 0px;
  padding: 0px 40px 0px 0px;
  font-size: 21px;
  color: white;
}
`