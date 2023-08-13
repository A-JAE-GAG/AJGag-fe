import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../store/atom';
import { postEmailConfirm, postSignIn, postSignUp } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { ButtonProps } from '../utils/infos/types';

function LoginModal() {

  const { register, handleSubmit, control, watch, formState  } = useForm();
  const LoginState = useSetRecoilState(loginState);
  const modalRef = useRef(null);
  const [isLogin, setisLogin] = useState<boolean>(true)

  const onMailUp = async (data :any) =>{
    console.log(watch('mailcode'))
    const mailup = await MailUpMutation.mutateAsync(watch().mailcode)
  }

  const onSignin =  async (data: any) =>{
    console.log(data);
    const datalist = {
      username : data.mail,
      password: data.password,
    }
    const signUP = await SignInMutation.mutateAsync(datalist as any)
  }

  const onSignup =  async (data: any) =>{
    console.log(data);
    const datalist = {
      username : data.mail,
      password: data.password,
      nickname : data.nickname
    }
    const signUP = await SignUpMutation.mutateAsync(datalist as any)
  }

  //사인인 만들기

  const SignInMutation = useMutation<any>(postSignIn,{
    onSuccess: ({ data }) => {
      console.log("로그인 성공")
      window.location.reload()
    },
    onError: (error) => {
      console.log("로그인 실패")
    },
  });
  const SignUpMutation = useMutation<any>(postSignUp,{
    onSuccess: ({ data }) => {
      console.log("가입 성공")
    },
    onError: (error) => {
      console.log("가입 실패")
    },
  });

  const MailUpMutation = useMutation<any>(postEmailConfirm,{
    onSuccess: ({ data }) => {
      console.log("전송 성공")
    },
    onError: (error) => {
      console.log("전송 실패")
    },
  });

  return (<LoginModalBackGround
    ref={modalRef}
    onClick={(e) => {
      if (modalRef.current === e.target) {
        LoginState(false);
      }
    }}>

    <ModalBoxs>
        <ModalHead>
          <h3>{isLogin ? '로그인' : '회원가입'}</h3>
        </ModalHead>
      <SignUpForm onSubmit={handleSubmit(isLogin ? onSignin : onSignup)
      }>
      {isLogin === false && 
        <InputWrapper>
        <InputTextBox>
        <h3>닉네임</h3>
      <Controller
        name="nickname"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputBox>
          <InputStyle
          {...register("nickname",{
            required:"닉네임을 입력하세요.",
            maxLength: {
              value: 10,
              message: "10자 아래로 입럭하세요"
            }
          })}
          />
          {formState.errors.nickname && (
            <ErrorMessage>닉네임은 10자 이하이어야만 합니다.</ErrorMessage>
          )}
          </InputBox>
        )}
      />
      </InputTextBox>
        </InputWrapper>
      }
        <InputWrapper>
        <InputTextBox>
        <h3>이메일</h3>
      <Controller
        name="mail"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputBox>
          <InputStyle
          {...register("mail",{
            required:"이메일을 입력하세요.",
            pattern: {
              value:/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "올바른 이메일을 입력해주세요"
            }
          })}
          />
          {formState.errors.mail && (
            <ErrorMessage>올바른 이메일을 입력해주세요</ErrorMessage>
          )}
          </InputBox>
        )}
      />
        </InputTextBox>
        <ButtonBox>
        {isLogin === false && <ButtonStyled onClick={onMailUp}>인증하기</ButtonStyled>}

        </ButtonBox>
        </InputWrapper>
        <InputWrapper>
        <InputTextBox>
        <h3>비밀번호</h3>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputBox>
          <InputStyle
          {...register("password",{
            required:"비밀번호를 입력하세요.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,15}$/,
              message: "영문, 숫자, 특수문자 포함 10~15자로 입력해주세요"
            }
          })}
          />
          {formState.errors.password && (
            <ErrorMessage>영문, 숫자, 특수문자 포함 10~15자로 입력해주세요</ErrorMessage>
          )}
          </InputBox>
        )}
      />
      </InputTextBox>
        </InputWrapper>
        
        {isLogin ? <ButtonStyled width='150px' height='40px'>로그인하기</ButtonStyled> : <ButtonStyled width='150px' height='40px'>가입하기</ButtonStyled>}
        {isLogin ? <ButtonStyled width='150px' height='40px' type='button' onClick={() => setisLogin(false)}>회원가입</ButtonStyled> : <ButtonStyled width='150px' height='40px' type='button' onClick={() => setisLogin(true)}>돌아가기</ButtonStyled>}
      </SignUpForm>
      
    </ModalBoxs>
  </LoginModalBackGround>)
}


const ErrorMessage = styled.p`
  color: red;
  font-size: 8pt;
  margin: 0px;
`;

const ModalHead = styled.div`
  background-color: rgba(111, 168, 255, 1);
  width: 100%;
  height: 100px;
  border-radius: 15px 15px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3{
    margin: 0px;
    overflow: hidden;
    font-size: 35px;
    color: white;
  }
`

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
justify-content: center;
height: 100%;
`

const ButtonStyled = styled.button<ButtonProps>`
background-color: rgb(217, 217, 217);
  width: ${props => (props.width ? props.width : '80px')};
height: ${props => (props.height ? props.height : '30px')};
border: none;
border-radius: 10px;
font-weight: 700;
margin-top: 20px;
`

const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
const InputTextBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
margin-right: 15px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 70%;
  height: 70px;
  margin-bottom: 10px;
  
  h3{
    margin: 0px;
    overflow: hidden;
    font-size: 20px;
  }
`;

const InputStyle = styled.input`
width: 350px;
height: 40px;
background-color: rgb(217, 217, 217);
border: none;
border-radius: 5px;
font-size: 16px;
color: rgb(0, 0, 0);
  
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 50vh;
  gap: 19px;
`;
const ModalBoxs = styled.div`
    width: 550px;
    height:700px;
    border-radius: 15px;
    align-items: center;
    background-color: white;
  input {
    @media (max-width: 750px) {
      width: 100%;
    }
  }
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