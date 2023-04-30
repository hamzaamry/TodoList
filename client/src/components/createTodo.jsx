// src/components/createTodo.jsx

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

export function CreateTodo() {
    const [data, setData] = useState({ title: "", description: "" });
    const [message , setMessage] = useState("")
    const { user } = useContext(AuthContext);

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!data.title) {
            setMessage("You should create a task!");
            return;
        }

        const todo = {
            title: data.title,
            description: data.description,
            userID: user._id
        };

        console.log({ todo });
        axios
            .post("http://localhost:8000/api/todo", todo)
            .then((res) => {
                setData({ title: "", description: "" });
                setMessage("Task added successfully. Back to see all your tasks.");
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    }

    return (
        <section className="container">
            <Link to="/all-todo" className="button-back">
                <button type="button" className="button">
                    back
                </button>
            </Link>
            <section className="contents">
                <div className="create-todo-title">
                    <h2>Create new task</h2>
                </div>
                {message && <div className="message">{message}</div>}
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <div className="todo-input">
                        <input
                            placeholder="Task"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="input"
                            autocomplete="off"
                        />
                        </div>

                    <div className="todo-input">
                        <input
                            placeholder="Description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="input"
                            autocomplete="off"
                        />
                    </div>
                    <button type="submit" className="button">
                        create todo
                    </button>
                </form>
            </section>
        </section>
    );
}
