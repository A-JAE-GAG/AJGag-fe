import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import GagListComp from '../components/GagListComp';
import { FormData, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';
import { useQuery } from 'react-query';
import { getGagPage } from '../utils/api/api';
import { getCookie } from '../utils/infos/cookie';
import { getLocalStorage } from '../utils/infos/loaclStorage';


function GagDetail (){

   
      return (<BackgroundBox><GagBackGound></GagBackGound></BackgroundBox>);
  }
  
  
  
  
  export default GagDetail;

  const BackgroundBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `
  const GagBackGound = styled.div`
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
    width: 700px;
    height: 500px;
  background-color: rgba(111, 168, 255, 1);
  padding-left: 25px;
  padding-bottom: 25px;
  `