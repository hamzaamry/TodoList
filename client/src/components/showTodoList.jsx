// src/components/showTodoList.jsx

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo"; 
import { AuthContext } from '../context/AuthContext';
import '../styles/showtodo.css'

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description } = data;

    return (
        <div key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button-ed" name={_id} onClick={handleEdit}> 
                    edit
                </button>
                <button className="button-de" name={_id} onClick={handleDelete}>
                    delete
                </button>
            </div>
        </div>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false); 
    const [id, setId] = useState(""); 
    const [update, setUpdate] = useState(false); 
    const { user } = useContext(AuthContext);
    const isLogged = user && user._id;
    useEffect(
        function () {
            
            axios
                .get("http://localhost:8000/api/todo/all", { params: { userId: user && user._id } })
                .then((res) => {
                    console.log(res.data);
                    if(res.data && res.data.length > 0) {
                        setTodo(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [isLogged]
    );

    function handleEdit(e) { 
        setId(e.target.name); 
        setOpen(true);
    }

    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { 
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new"> 
                <button className="button">
                    New
                </button>
            </Link>
            <section className="contents">
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            key={data._id}
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
        
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}
