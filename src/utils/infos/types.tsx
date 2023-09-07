import { type } from "os";
import React from "react";

export interface GagAnswer {
  id: number;
  answer: string;
}

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

export interface GagDetailContent{
  title:string;
  content:string;
  gagId:string;
  nextGagId:number | null;
  prevGagId:number | null;
}

export interface PostGagType{
  title : string;
  content : string;
  answer : string;
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

export interface GagDetailDelete{
  Id:string;
}

export interface GagDetailPage{
  Id:string|null;
}
export interface GagListGet{
  page: number;
  size: number;
  sort?: string;
}