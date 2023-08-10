import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  input1: string;
  input2: string;
}

function GagList() {
  const { handleSubmit, control, watch } = useForm<FormData>();
  const input1Value = watch('input1', '');
  const input2Value = watch('input2', '');

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="input1"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Input 1" />}
      />
      <button type="button" onClick={() => console.log('Input 1:', input1Value)}>인풋 1 출력</button>

      <Controller
        name="input2"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Input 2" />}
      /> 
      <button type="button" onClick={() => console.log('Input 2:', input2Value)}>인풋 2 출력</button>

      <button type="submit">제출</button>
    </form>
  );
}

  
  export default GagList;