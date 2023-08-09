import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import MainButton from '../components/MainButton';
import LoginModal from '../components/LoginModal';
import { useRecoilValue } from "recoil";
import { loginState } from '../store/atom';


function Main (){
    const LoginState = useRecoilValue(loginState);
  
      return (<>
      <Maincontainer>
      {LoginState === true && <LoginModal />}
        <MainTitleContainer>
        <h1>ㅇㅈ개그</h1>
        <h2>당신의 개그는 아재? 인정?</h2>
        </MainTitleContainer>
        <SubTitleContainer>
        <h3>물고기 중 가장 똑똑한 물고기는?</h3>
        <h4>대답할 자신있다면 클릭!</h4>
        </SubTitleContainer>
        <ButtonContainer>
        <MainButton name = {"개그 맞춰보기"} link = {"/GagDetail"}></MainButton>
        <MainButton name = {"개그 올려보기"} link = {""}></MainButton>
        <MainButton name = {"개그 전부보기"} link = {"/GagList"}></MainButton>
        </ButtonContainer>
      </Maincontainer>
      
      </>);
  }
  
  const ButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  margin-top: 120px;
  `
  const SubTitleContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  `
  const MainTitleContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 60px;
  `

  const Maincontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    width: 100vw;
    height: 100vh;
  h1{
    margin: 0px;
    overflow: hidden;
    font-size: 64px;
}
  h2{
    margin: 0px;
    overflow: hidden;
    font-size: 48px;
  }
  h3{
    margin: 0px;
    overflow: hidden;
    color: gray;
    font-size: 25px;
  }
  h4{
    margin: 0px;
    overflow: hidden;
    color: gray;
    font-size: 20px;
  }
  h5{
  }
  
  `
  
  
  export default Main;