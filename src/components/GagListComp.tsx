import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { postEmailConfirm, postSignIn, postSignUp } from '../utils/api/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { getLocalStorage } from '../utils/infos/loaclStorage';
import { gagModalState } from '../store/atom';


const GagListComp = () =>{


    return(<GagBox>
    
    
    </GagBox>)
}

export default GagListComp


const GagBox = styled.button`
cursor: pointer;
border: none;
border-radius: 18px;
    width: 300px;
    height: 180px;
  background-color: rgba(111, 168, 255, 1);
`