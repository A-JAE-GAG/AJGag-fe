import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import GagListComp from '../components/GagListComp';
import { FormData, GagDetailContent, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';
import { useMutation, useQuery } from 'react-query';
import { getGagDetailPage, postGagAnswer } from '../utils/api/api';
import { getCookie } from '../utils/infos/cookie';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { useParams, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';


function GagDetail (){
    const pam = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit, control, watch, formState } = useForm();
    const detailId = searchParams.get("id");
    const [gagData, setGagData] = useState<GagDetailContent>()
    const { isLoading } = useQuery(["getList", { Id: pam.id}],
    () => getGagDetailPage({Id : detailId}),
  {
    onSuccess:({ data })=>{
      setGagData(data.data)
    }
  }
    )


    const GagupMutation = useMutation<any>(postGagAnswer,{
        onSuccess: ({ data }) => {
          console.log("업로드 성공")
        },
        onError: (error) => {
          console.log("업로드 실패")
        },
      });
    

    const postAnswer =async (data:any) => {
        console.log(data)
        const res = await GagupMutation.mutateAsync(data)
    }
   
      return (<BackgroundBox>
        <GagBackGround onSubmit={handleSubmit(postAnswer)}>
            <GagNameBox>
            <h3>{gagData?.title}</h3>
            </GagNameBox>
            <GagContentBox>
            <h4>{gagData?.content}</h4>
            </GagContentBox>
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
            </BackgroundBox>);
  }
  
  
  
  
  export default GagDetail;

  const GagAnswerForm = styled.div`
    
  `

  const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Prefix = styled.span`
  margin-right: 8px;
`;

  const InputStyle = styled.input`
  margin-top: 15px;
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