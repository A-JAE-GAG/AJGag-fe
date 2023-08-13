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


function GagListComp (props : GagListCompProps){

    return(<GagBox readed={props.isreaded}>
      <h3>
        왕이 넘어지면?
      </h3>
      <h4>
        왕이 넘어지면?
      </h4>
      <GagBoxInsideBoxWrapper>
      <GagBoxInsideBox></GagBoxInsideBox>
      <GagBoxInsideBox></GagBoxInsideBox>
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
border-radius: 18px;
    width: 300px;
    height: 180px;
  background-color: ${props => (props.readed == false ?'rgba(111, 168, 255, 1)' : 'rgba(167, 200, 250, 1)')};
  padding-left: 25px;
  padding-bottom: 25px;
  `