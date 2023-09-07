import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { deleteMyGag, postEmailConfirm, postSignIn, postSignUp } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { gagModalState } from '../store/atom';
import { GagBoxBackColor, GagDetailPage, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function GagListComp (props : GagListCompProps){
  const navigate = useNavigate()
  const location = useLocation()

  const OnDelete =async (data:any) => {
    const ondel = await DeleteMutation.mutateAsync(data)
}

//<any>붙인게 에러라고?
const DeleteMutation= useMutation(deleteMyGag, {
    onSuccess: () => {
      window.alert("삭제 성공")
      window.location.reload()
    },
    onError: (error) => {
      console.log("전송 실패")
    },
  });

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if(window.confirm("이 개그를 정말로 삭제하시겠습니까?")){
      OnDelete({Id : props.gagId})
    }
  };

    return(<GagBox solved={props.solved} onClick={()=> {navigate(`/GagDetail/?id=${props.gagId}`)}}>
      <h3>{props.title}</h3>
      <h4>{props.author}</h4>
      <GagBoxInsideBoxWrapper>
      <GagBoxInsideBox>
        <span>정답률<br/>{props.answerRate !== null ? props.answerRate+ "%" : '-'}</span>
      </GagBoxInsideBox>
      <GagBoxInsideBox>
        <span>인정<br/>{props.agree}</span>
        <span>&nbsp;vs&nbsp;<br/>&nbsp;</span>
        <span>아재<br/>{props.ajae}</span>
        </GagBoxInsideBox>
      </GagBoxInsideBoxWrapper>
      {location.pathname == "/Profile" ? <CloseButton onClick={handleCloseButtonClick}>X</CloseButton>:null}
      
    </GagBox>)
}

export default GagListComp

const GagBoxInsideBoxWrapper = styled.div`
display: flex;
align-items: center;
width: 90%;
flex-direction: row;
justify-content: space-between;
`

const GagBoxInsideBox = styled.div`
width: 100px;
height: 60px;
background-color: white;
border-radius: 10px;
display: flex;
align-items: center;
justify-content:center;
flex-direction: row;
`

const GagBox = styled.button<GagBoxBackColor>`
cursor: pointer;
position: relative;
border: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
  h3{
    font-size: 18px;
    color: white;
    margin-bottom: 6px;
    text-align: start;
  }
  h4{
    font-size: 14px;
    color: white;
    margin-bottom: 15px;
    text-align: start;
  line-height: 10px;
  }
  span{
    font-size: 14px;
    color: black;
    text-align: center;
  }
border-radius: 18px;
    width: 300px;
    height: 180px;
  background-color: ${props => (props.solved == false ?'rgba(111, 168, 255, 1)' : 'rgba(167, 200, 250, 1)')};
  padding-left: 25px;
  padding-bottom: 25px;
  `
const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  background: white;
  color: red;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 28px;
  align-items: center;
  cursor: pointer;
`;
