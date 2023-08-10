import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../store/atom';
import { postEmailConfirm } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';

function LoginModal() {

  const { handleSubmit, control, watch } = useForm();
  const LoginState = useSetRecoilState(loginState);
  const modalRef = useRef(null);

  const onMailUp = async (data :any) =>{
    console.log(watch('mailcode'))
    //const mailup = await MailUpMutation.mutateAsync(watch().mailcode)
  }

  const onSignup = (data: any) =>{
    console.log(data.textInput);
  }

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
      <SignUpForm onSubmit={handleSubmit(onSignup)
      }>
        <InputWrapper>
      <Controller
        name="mail"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="이메일을 입력하세요" />}
      />
      <button onClick={onMailUp}>
        이메일 인증하기
      </button>
        </InputWrapper>
        <InputWrapper>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="비밀번호를 입력하세요" />}
      />
        </InputWrapper>
        <InputWrapper>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="닉네임을 입력하세요" />}
      />
        </InputWrapper>
        <InputWrapper>
      <Controller
        name="mailcode"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="이메일 인증 코드" />}
      />
          <button onClick={onMailUp}>
            인증
          </button>
        </InputWrapper>
        <button>
          가입하기
        </button>

      </SignUpForm>

    </ModalBoxs>
  </LoginModalBackGround>)
}
const InputWrapper = styled.div`
  position: relative; // 추가된 속성
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;


const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 65vh;
  gap: 2rem;
  button {
    margin-top: 1rem;
  }
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 2.1rem;
    color: #505050;
    span {
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
      font-size: 2.2rem;
    }
  }
`;
const ModalBoxs = styled.div`
    width: 500px;
    height:500px;
    border-radius: 15px;
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