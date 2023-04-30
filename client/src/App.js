import React from "react";
import { CreateTodo } from "./components/createTodo";

import { ShowTodoList } from "./components/showTodoList";

import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AuthContextProvider from './context/AuthContext';
import Herosection from "./components/Herosection";
import './styles/showtodo.css'

import bgImage from './styles/bgtodo.jpg';


function App() {
    return (
        <div className="app-contents bg-image" style={{background: `url(${bgImage}) no-repeat center center fixed`, backgroundSize: 'cover' , height: '100vh' }}>
            <AuthContextProvider>
             <BrowserRouter>
                <header>
                    <Navbar />
                </header>
                    <Routes>
                        <Route path="/" element={<Herosection/>} />
                        <Route path="/all-todo" element={<ShowTodoList />} />
                        <Route path="/create-todo" element={<CreateTodo />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/*" element={<h1>NOT FOUND! EROOR 404</h1>} /> 
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
}

export default App;