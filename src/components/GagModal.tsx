import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { postEmailConfirm, postGag, postSignIn, postSignUp } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { gagModalState } from '../store/atom';
import { useNavigate } from 'react-router-dom';
import { ButtonProps } from '../utils/infos/types';

function GagModal() {

  const navigate = useNavigate()
  const modalRef = useRef(null);
  const { register, handleSubmit, control, watch, formState } = useForm();
  const GagModalState = useSetRecoilState(gagModalState)

  const GagupMutation = useMutation<any>(postGag,{
    onSuccess: ({ data }) => {
      //console.log("업로드 성공")
      navigate('/')
      window.location.reload()
    },
    onError: (error) => {
      console.log("업로드 실패")
    },
  });

  const postGagUp = async (data:any) =>{
    //console.log(data)
    const res = await GagupMutation.mutateAsync(data)
  }

  return (<GagModalBackGround
    ref={modalRef}
    onClick={(e) => {
      if (modalRef.current === e.target) {
        GagModalState(false);
      }
    }}>
    <ModalBoxs>
      <ModalHead>
        <h3>개그 올려보기</h3>
      </ModalHead>
      <GagUpForm onSubmit={handleSubmit(postGagUp)}>
        <InputWrapper>
          <InputTextBox>
            <h3>개그 제목</h3>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputBox>
                  <InputStyle
                    {...register("title", {
                      required: "제목을 입력하세요.",
                      maxLength: {
                        value: 30,
                        message: "30자 아래로 입럭하세요"
                      }
                    })}
                  />
                  {formState.errors.gagname && (
                    <ErrorMessage>제목은 30자 이하이어야만 합니다.</ErrorMessage>
                  )}
                </InputBox>
              )}
            />
          </InputTextBox>
        </InputWrapper>
        <InputWrapper>
          <InputTextBox>
            <h3>개그 내용</h3>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputBox>
                  <InputStyle
                    {...register("content", {
                      required: "내용을 입력하세요.",
                      maxLength: {
                        value: 100,
                        message: "100자 아래로 입럭하세요"
                      }
                    })}
                  />
                  {formState.errors.gagcontents && (
                    <ErrorMessage>내용은 100자 이하이어야만 합니다.</ErrorMessage>
                  )}
                </InputBox>
              )}
            />
          </InputTextBox>
        </InputWrapper>
        <InputWrapper>
          <InputTextBox>
            <h3>정답</h3>
            <Controller
              name="answer"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputBox>
                  <InputStyle
                    {...register("answer", {
                      required: "내용을 입력하세요.",
                      maxLength: {
                        value: 30,
                        message: "30자 아래로 입럭하세요"
                      }
                    })}
                  />
                  {formState.errors.gaganswer && (
                    <ErrorMessage>정답은 30자 이하이어야만 합니다.</ErrorMessage>
                  )}
                </InputBox>
              )}
            />
          </InputTextBox>
        </InputWrapper>
        <ButtonStyled width='150px' height='40px'>개그 올리기!</ButtonStyled>
      </GagUpForm>

    </ModalBoxs>
  </GagModalBackGround>)
}

export default GagModal;

const ErrorMessage = styled.p`
  color: red;
  font-size: 8pt;
  margin: 0px;
`;

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

const GagUpForm = styled.form`
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

const GagModalBackGround = styled.div`
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