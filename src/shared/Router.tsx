import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Main';
import GagDetail from '../pages/GagDetail';
import Profile from '../pages/MyGag';
import GagList from '../pages/GagList';
import Header from "../components/global/Header";

const Router = () =>{
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route element = {<Main />} path = "/" />
            <Route element = {<GagList />} path = "/GagList" />
            <Route element = {<GagDetail />} path = "/GagDetail" />
            <Route element = {<Profile />} path = "/Profile" />
        </Routes>
        </BrowserRouter>
    )
}
export default Router;