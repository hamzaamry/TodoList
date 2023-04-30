import { useState } from "react";
import axios from "axios";
import '../styles/showtodo.css'


export function UpdateTodo({ _id, handleClose }) {
    const [data, setData] = useState({ title: "", description: "" });


    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
        
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
            window.location.href = "/all-todo"
 
    }
    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleClose();
            }}
        >
            <h2>update task :</h2>
            <div className="todo-input">
                <input
                    type="text"
                    name="title"
                    className="input"
                    onChange={handleChange}
                    placeholder="Task"
                    autocomplete="off"
                />
            </div>
            <div className="todo-input">
                <input
                    type="text"
                    name="description"
                    className="input"
                    onChange={handleChange}
                    placeholder="Description"
                    autocomplete="off"
                />
            </div>
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}