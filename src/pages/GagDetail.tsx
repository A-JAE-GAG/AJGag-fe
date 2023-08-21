import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { keyframes, styled } from 'styled-components';
import GagListComp from '../components/GagListComp';
import { FormData, GagAnswer, GagDetailContent, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';
import { useMutation, useQuery } from 'react-query';
import { getGagDetailPage, postGagAnswer } from '../utils/api/api';
import { getCookie } from '../utils/infos/cookie';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { useParams, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import checkmark from "../assets/checkmark.svg"
import cancel from "../assets/cancel.svg"
import { timeout } from 'q';

function GagDetail (){
    const pam = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit, control, watch, formState } = useForm();
    const detailId = searchParams.get("id");
    const [gagData, setGagData] = useState<GagDetailContent>()
    const [animationPaused, setAnimationPaused] = useState(false);
    const [timeOut, setTimeOut] = useState(false);
    const [answerEnd, setAnswerEnd] = useState(false);
    const { isLoading } = useQuery(["getList", { Id: pam.id}],
    () => getGagDetailPage({Id : detailId}),
  {
    onSuccess:({ data })=>{
      setGagData(data.data)
    }
  }
    )
  useEffect(( )=>{
    setTimeout(() => {
      if(animationPaused == false && answerEnd == false){
        setTimeOut(true);
        console.log("시간아웃")
        postAnswer({answer : "timeout"})
      }
    }, 3500);
  },[])

    const GagupMutation = useMutation<any>(postGagAnswer,{
        onSuccess: (responseData) => {
          console.log(responseData.data.data.answer)
          if(responseData.data.data.answer == "오답입니다." && animationPaused ==false && timeOut == false && answerEnd === false){
            setAnswerEnd(true);
            setTimeout(() => {
              setAnswerEnd(false);
            }, 1300);
          }
          else if(timeOut == false){
            window.alert("정답입니다.")
            setAnimationPaused(true)
            setAnswerEnd(true)
          }
          else if(timeOut == true){
            window.alert("시간 초과.")
            setAnswerEnd(true)
          }
        },
        onError: (error) => {
          console.log("업로드 실패")
        },
      });
    

      const postAnswer = async (data: any) => {
        const payload: any = {
          id: detailId,
          answer: data.answer,
        };
        if(answerEnd != true){
          const res = await GagupMutation.mutateAsync(payload);
        }
      };
   
      return (<BackgroundBox>
        <GagBackGround onSubmit={handleSubmit(postAnswer)}>
            <GagNameBox>
            <h3>{gagData?.title}</h3>
            </GagNameBox>
            <GagContentBox>
            <h4>{gagData?.content}</h4>
            </GagContentBox>
            <GageBackGround>
                <GageFront paused={animationPaused} />
            </GageBackGround>
            <Controller
                name = "answer"
                control={control}
                defaultValue=""
                render={() =>(
                    <InputStyle
                    {...register("answer", {
                      required: "정답을 입력하세요."
                    })} />)}
            />
            </GagBackGround>
            {(animationPaused && answerEnd && timeOut == false) && <CheckMark src={checkmark} />}
            {(!animationPaused && timeOut) && <CheckMark src={cancel} />}
            </BackgroundBox>);
  }
  
  export default GagDetail;

  const blinkingAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;
  const CheckMark = styled.img`
    position: fixed;
    width: 800px;
    height: 800px;
  animation: ${blinkingAnimation} 2s ease-in-out 0.4s infinite;
  `

  const GagAnswerForm = styled.div`
    
  `

  const decreaseAnimation = keyframes`
    from {width: 650px;} to {width: 25px;}
  `;

  const GageFront = styled.div<{ paused: boolean }>`
  background-color: #0be90b;
  border-radius: 35px;
  width: 650px;
  height: 25px;
  animation: ${decreaseAnimation} 3.5s linear forwards;
  animation-play-state: ${props => (props.paused ? 'paused' : 'running')};
  `

  const GageBackGround = styled.div`
  background-color: white;
  border-radius: 35px;
  width: 650px;
  height: 25px;
  `

  const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Prefix = styled.span`
  margin-right: 8px;
`;

  const InputStyle = styled.input`
  margin-top: 25px;
  width: 650px;
  height: 50px;
  background-color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  color: rgb(0, 0, 0);
  `

  const GagNameBox = styled.div`
  width: 800px;
  height: 100px;
  `
  const GagContentBox = styled.div`
  width: 800px;
  height: 300px;
  `

  const BackgroundBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `
  const GagBackGround = styled.form`
border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top : 35px;
  h3{
    font-size: 29px;
    color: white;
    margin-bottom: 6px;
    text-align: center;
  }
  h4{
    font-size: 24px;
    color: white;
    margin-bottom: 15px;
    text-align: start;
  }
  span{
    font-size: 14px;
    color: black;
    text-align: center;
  }
border-radius: 18px;
    width: 900px;
    height: 600px;
  background-color: rgba(111, 168, 255, 1);
  padding-left: 25px;
  padding-bottom: 25px;
  `