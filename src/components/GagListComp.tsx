import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { postEmailConfirm, postSignIn, postSignUp } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { gagModalState } from '../store/atom';
import { GagBoxBackColor, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';

function GagListComp (props : GagListCompProps){

    return(<GagBox readed={props.isreaded}>
      <h3>
        왕이 넘어지면?
      </h3>
      <h4>
        썰렁 아재
      </h4>
      <GagBoxInsideBoxWrapper>
      <GagBoxInsideBox>
        <span>정답률<br/>52%</span>
        <span></span>
      </GagBoxInsideBox>
      <GagBoxInsideBox>
        <span>인정<br/>15</span>
        <span>&nbsp;vs&nbsp;<br/>&nbsp;</span>
        <span>아재<br/>12</span>
        </GagBoxInsideBox>
      </GagBoxInsideBoxWrapper>
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
  background-color: ${props => (props.readed == false ?'rgba(111, 168, 255, 1)' : 'rgba(167, 200, 250, 1)')};
  padding-left: 25px;
  padding-bottom: 25px;
  `