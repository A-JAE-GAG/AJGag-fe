import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { keyframes, styled } from 'styled-components';
import { FormData, GagAnswer, GagDetailContent, GagListCompProps } from '../utils/infos/types';
import { useMutation, useQuery } from 'react-query';
import { getGagDetailPage, postGagAnswer, postInjungAjae } from '../utils/api/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import checkmark from "../assets/checkmark.svg"
import cancel from "../assets/cancel.svg"

function GagDetail() {
  const navigate = useNavigate()
  const pam = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, control, watch, formState } = useForm();
  const detailId = searchParams.get("id");
  const [gagData, setGagData] = useState<GagDetailContent>()
  const isAnswerSubmitted = useRef(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const timeOut = useRef(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [answerEnd, setAnswerEnd] = useState(false);
  const { isLoading } = useQuery(["getList", { Id: pam.id }],
    () => getGagDetailPage({ Id: detailId }),
    {
      onSuccess: ({ data }) => {
        setGagData(data.data)
      }
    }
  )

  const moveOtherGag = (value: number) => {
    if (value != 0) {
      navigate(`/GagDetail/?id=${value}`)
      window.location.reload()
    }
    else {
      window.alert("더 이상 개그가 없습니다!")
    }
  }

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
    if(value == "injung"){
      postInjungOrAjae(false)
    }
    else{
      postInjungOrAjae(true)
    }
    console.log(value); // Log the selected value to the console
  };

  const InjungAjaeMutation = useMutation<any> (postInjungAjae,{
    onSuccess: (responseData) => {
      console.log(responseData)
    },
    onError: (error) => {
      console.log("업로드 실패")
    },
  })

  const GagupMutation = useMutation<any>(postGagAnswer, {
    onSuccess: (responseData) => {
      console.log(responseData.data.data.answer)
      if (responseData.data.data.answer == "timeout") {
        isAnswerSubmitted.current = true;
        if(responseData.data.data.agree == true){
          setSelectedOption("injung")
        }
        if(responseData.data.data.ajae == true){
          setSelectedOption("ajae")
        }
        setAnswerEnd(true)
        window.alert(`시간 초과! 정답은 "${responseData.data.data.realAnswer}"`)
      }
      else if (responseData.data.data.answer == "오답입니다." && timeOut.current == false) {
        setAnswerEnd(true);
        isAnswerSubmitted.current = false;
        setTimeout(() => {
          setAnswerEnd(false);
        }, 1300);
      }
      else if (timeOut.current == false) {
        setAnimationPaused(true)
        isAnswerSubmitted.current = true;
        timeOut.current = true
        setAnswerEnd(true)
        if(responseData.data.data.agree == true){
          setSelectedOption("injung")
        }
        if(responseData.data.data.ajae == true){
          setSelectedOption("ajae")
        }
      }
    },
    onError: (error) => {
      console.log("업로드 실패")
    },
  });

  useEffect(() => {
    const timeOutReturn = setTimeout(() => {
      console.log(timeOut)
      if (timeOut.current == false) {
        timeOut.current = true;
        console.log("시간아웃")
        postAnswer({ answer: "timeout" })
      }
    }, 15000);
    return () => {
      clearTimeout(timeOutReturn)
    }
  }, [])

  const postInjungOrAjae =async (isAjaebool: boolean) => {
    
    var payload: any ={ 
      id: detailId,
      isAjae: isAjaebool
    }
    const res = await InjungAjaeMutation.mutateAsync(payload)
  }

  const postAnswer = async (data: any) => {
    if (isAnswerSubmitted.current == false) { // 이 부분 추가
      const payload: any = {
        id: detailId,
        answer: data.answer,
      };

      if (answerEnd !== true) {
        const res = await GagupMutation.mutateAsync(payload);
      }
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
        name="answer"
        control={control}
        defaultValue=""
        render={() => (
          <InputStyle
            {...register("answer", {
              required: "정답을 입력하세요."
            })} />)}
      />
    </GagBackGround>
    {(animationPaused && answerEnd && timeOut) && <CheckMark src={checkmark} />}
    {(answerEnd && !animationPaused) && <CheckMark src={cancel} />}
    {timeOut.current &&
      <MoveOtherGagBox>
        <RadioButton onClick={() => moveOtherGag(gagData?.nextGagId as number)}><span>&lt;</span></RadioButton>
        <InjungAjaeTextBox>
          <InjungAjaeText>
            <RadioButton onClick={() => handleButtonClick('injung')} isSelected={selectedOption === 'injung'} >인정!</RadioButton>
            <span>&nbsp;VS&nbsp;</span>
            <RadioButton onClick={() => handleButtonClick('ajae')} isSelected={selectedOption === 'ajae'}>아재!</RadioButton>

          </InjungAjaeText>
          <p>선택하고 다음 개그로!</p>
        </InjungAjaeTextBox>
        <RadioButton onClick={() => moveOtherGag(gagData?.prevGagId as number)}><span>&gt;</span></RadioButton>
      </MoveOtherGagBox>}
          <p onClick={()=> {navigate('/Gaglist')}}>목록으로</p>

  </BackgroundBox>);
}

export default GagDetail;

const BackgroundBox = styled.div`
  width: 100vw;
  height: 100vh - 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 150px;
  p{
    cursor: pointer;
    font-size: 29px;
    color: gray;
    margin-bottom: 6px;
    text-align: center;
  }
  `
const blinkingAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;
const CheckMark = styled.img`
    position: fixed;
    width: 600px;
    height: 600px;
    top: calc(50% - 450px); /* 화면 정중앙에서 위로 250px 만큼 이동 */
  left: calc(50% - 300px);
    z-index: 1; 
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
  animation: ${decreaseAnimation} 15s linear forwards;
  animation-play-state: ${props => (props.paused ? 'paused' : 'running')};
  `

const GageBackGround = styled.div`
  background-color: white;
  border-radius: 35px;
  width: 650px;
  height: 25px;
  `

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

const InjungAjaeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  `

const MoveOtherGagBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  `

const InjungAjaeTextBox = styled.div`
  margin-top: 10px;
  border-radius: 15px;
  width: 440px;
  background-color: rgba(111, 168, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  p{
    font-size: 34px;
    color: white;
    margin: 5px;
  }
  span{
    font-size: 64px;
    color: white;
    text-align: center;
  }
  `
const RadioButton = styled.button<{ isSelected?: boolean }>`
  border: none;
  background: none;
    font-size: 64px;
    text-align: center;
    cursor: pointer;
  color: ${props => (props.isSelected ? 'green' : 'white')};
  
  span{
    font-size: 90px;
    color: rgba(111, 168, 255, 1);
    text-align: center;
  }
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
    height: 500px;
  background-color: rgba(111, 168, 255, 1);
  padding-left: 25px;
  padding-bottom: 25px;
  `