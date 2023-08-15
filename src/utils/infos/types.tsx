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
  isreaded : boolean;
}

export interface GagListCompProps{
  isreaded: boolean;
  username: string;
}
export interface GagListGet{
  page: number;
  size: number;
  sort: string;
}