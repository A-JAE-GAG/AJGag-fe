import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import GagListComp from '../components/GagListComp';
import { FormData } from '../utils/infos/types';
import Pagination from 'react-js-pagination';


function GagList() {
  const { handleSubmit, control, watch } = useForm<FormData>();
  const input1Value = watch('input1', '');
  const input2Value = watch('input2', '');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1)
  const [standardPageNum, setStandardPageNum] = useState<number>(0)
  const [MaxPageNum, setMaxPageNum] = useState<number>(10)

  const [selectedOption, setSelectedOption] = useState('최신'); // Initial selection
  

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
    console.log(value); // Log the selected value to the console
  };

  const pageChange = (page:number) =>{
    console.log(page)
  }


  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (<BackgroundBox>
    <UpsideBox>
      <>
        <div>
          <RadioButton
            onClick={() => handleButtonClick('최신')}
            style={{ fontWeight: selectedOption === '최신' ? 'bold' : 'normal' }}
          >
            최신개그
          </RadioButton>
          <span>|</span>
          <RadioButton
            onClick={() => handleButtonClick('주간')}
            style={{ fontWeight: selectedOption === '주간' ? 'bold' : 'normal' }}
          >
            주간개그
          </RadioButton>
          <span>|</span>
          <RadioButton
            onClick={() => handleButtonClick('인기')}
            style={{ fontWeight: selectedOption === '인기' ? 'bold' : 'normal' }}
          >
            인기개그
          </RadioButton>
        </div>
      </>
    </UpsideBox>
    <GagOverlay></GagOverlay>
    <ListBox>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {true} username='김호이'></GagListComp>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
      <GagListComp isreaded = {false} username='김호이'></GagListComp>
    </ListBox>
    <PageBox>
      <Pagination
        activePage={7}
        itemsCountPerPage={15}
        totalItemsCount={200}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={pageChange}/>
    </PageBox>
  </BackgroundBox>
  );
}


export default GagList;

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