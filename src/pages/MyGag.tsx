import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import GagListComp from '../components/GagListComp';
import { FormData, GagListCompProps } from '../utils/infos/types';
import Pagination from 'react-js-pagination';
import { useMutation, useQuery } from 'react-query';
import { getMyGagPage, deleteMyGag } from '../utils/api/api';
import { getCookie } from '../utils/infos/cookie';
import { getLocalStorage } from '../utils/infos/loaclStorage';



function Profile (){

    const { handleSubmit, control, watch } = useForm<FormData>();
    const [currentPageNum, setCurrentPageNum] = useState<number>(1)
    const [standardPageNum, setStandardPageNum] = useState<number>(0)
    const [totalNum, setTotalNum] = useState<number>(1)
    const [contentlist, setContentlist] = useState<GagListCompProps[]>([])
    const [solvedlist, setSolvedlist] = useState<number[]>([])

    const { isLoading } = useQuery(["getList", { page: currentPageNum, size: 15}],
    () => getMyGagPage({page : currentPageNum, size : 15, }),
  {
    onSuccess:({ data })=>{
      //console.log(data.data.content)
     // console.log(data.data)
      //console.log(data)
    setTotalNum(data.data.totalPages)
        setContentlist(data.data.content)
        setSolvedlist(data.data.visitedGags)
    }
  })
    
      return (<BackgroundBox>
        <UpsideBox>
          <>
              <RadioButton>
                내가 올린 개그
              </RadioButton>
          </>
        </UpsideBox>
        <GagOverlay></GagOverlay>
        {isLoading === false ?(<ListBox>
          {(contentlist)?.map((item)=>{ 
            return(<GagListComp key = {item.gagId} solved = {false} title = {item.title} author={item.author} answerRate={item.answerRate} agree={item.agree} ajae={item.ajae} gagId={item.gagId} ></GagListComp>)})
          }
        </ListBox>)
        :(<GagListComp solved = {false} author='김호이' answerRate={null} agree={0} ajae={0} gagId={0} title=''></GagListComp>)}
        
        <PageBox>
          <Pagination
            activePage={currentPageNum}
            itemsCountPerPage={15}
            totalItemsCount={totalNum}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(page) => setCurrentPageNum(page)}/>
        </PageBox>
      </BackgroundBox>);
  }
  
  
  
  
  export default Profile;

  const PageBox = styled.div`
    .pagination { display: flex; justify-content: center; margin-top: 15px;}
    ul { list-style: none; padding: 0; }
    ul.pagination li {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 1px solid #e2e2e2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem; 
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: #337ab7; }
    ul.pagination li a:hover,
    ul.pagination li a.active { color: blue; }
  `
  
  const RadioButton = styled.button`
    border: none;
    background: none;
    font-size: 35px;
    color: gray;`
  const UpsideBox = styled.div`
    width:80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 35px;
    }`
  
  const GagOverlay = styled.div`
    width:100%;
    max-width: 1540px;
    height: 5px;
    background-color: rgba(0, 0, 0, 1); /* Overlay color */
    z-index: 1; /* Position above GagBox */`
  
  const ListBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 35px;
    `
  
  const BackgroundBox = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    `