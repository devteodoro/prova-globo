import React from "react";
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import Users from '../Pages/Users/Users';
import Movies from '../Pages/Movie/Movie';


import { BrowserRouter as Router, Routes, Route } from "react-router";

const Routering = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/movies" element={<Movies/>}/>
            </Routes>
        </Router>         
    );
}

export default Routering;