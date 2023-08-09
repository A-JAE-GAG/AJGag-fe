import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../store/atom';

function LoginModal (){

    const LoginState = useSetRecoilState(loginState);
    return(<LoginModalBackGround onClick={() => LoginState(false)}>

        <ModalBoxs></ModalBoxs>
    </LoginModalBackGround>)
}

const ModalBoxs = styled.div`
    width: 500px;
    height:500px;
    background-color: white;
`

const LoginModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default LoginModal;