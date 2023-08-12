import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import GagListComp from '../components/GagListComp';

interface FormData {
  input1: string;
  input2: string;
}

function GagList() {
  const { handleSubmit, control, watch } = useForm<FormData>();
  const input1Value = watch('input1', '');
  const input2Value = watch('input2', '');

    const [selectedOption, setSelectedOption] = useState('최신'); // Initial selection
  
    const handleButtonClick = (value : string) => {
      setSelectedOption(value);
      console.log(value); // Log the selected value to the console
    };
  
  
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (<BackgroundBox>
    <UpsideBox>
      <>
    <div>
      <button
        onClick={() => handleButtonClick('최신')}
        style={{ fontWeight: selectedOption === '최신' ? 'bold' : 'normal' }}
      >
        최신
      </button>
      <button
        onClick={() => handleButtonClick('주간')}
        style={{ fontWeight: selectedOption === '주간' ? 'bold' : 'normal' }}
      >
        주간
      </button>
      <button
        onClick={() => handleButtonClick('인기')}
        style={{ fontWeight: selectedOption === '인기' ? 'bold' : 'normal' }}
      >
        인기
      </button>
    </div>
      </>
    </UpsideBox>
    <GagOverlay></GagOverlay>
    <ListBox>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    <GagListComp></GagListComp>
    </ListBox>
  </BackgroundBox>
  );
}

  
  export default GagList;

  const UpsideBox = styled.div`
  width:80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  `

  const GagOverlay = styled.div`
  width:100%;
  max-width: 1540px;
  height: 5px;
  background-color: rgba(0, 0, 0, 1); /* Overlay color */
  z-index: 1; /* Position above GagBox */
`;

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