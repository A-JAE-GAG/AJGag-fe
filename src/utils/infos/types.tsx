import { type } from "os";
import React from "react";

export interface ButtonProps {
  width?: string;
  height?: string;
}

export interface FormData {
    input1: string;
    input2: string;
  }
  
export interface MainButtonProps {
  name : string;
  link : string;
}

export interface GagBoxBackColor{
  solved : boolean;
}

export interface GagListCompProps{
  solved: boolean;
  author: string;
  answerRate:number | null;
  agree:number;
  ajae:number;
  gagId:number;
  title:string;
}
export interface GagListGet{
  page: number;
  size: number;
  sort: string;
}