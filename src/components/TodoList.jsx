import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';

const KEY = "todolist-todos"

export function TodoList(){

    const [todos, setTodos] = useState([]);

    const taskRef = useRef();
    const descRef = useRef();
    const imporRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])

    const agregarTarea = () => {        
        const task = taskRef.current.value;
        const descripcion = descRef.current.value;
        const importante = 'importante'; 
        const normal = 'normal';

        if (descripcion === '') return;

        if (imporRef.current.checked){
            setTodos((prevTodos) => {
                const newTask = {
                    id: uuid(),
                    task: task,
                    descripcion: descripcion,
                    importante: importante,
                    eliminar: false
                }
    
                return [...prevTodos, newTask]
            })    
        }
        else{
            setTodos((prevTodos) => {
                const newTask = {
                    id: uuid(),
                    task: task,
                    descripcion: descripcion,
                    importante: normal,
                    eliminar: false
                }
    
                return [...prevTodos, newTask]
            })
        }        

        taskRef.current.value = null;
        descRef.current.value = null;
        imporRef.current.checked = false;
    }

    const eliminarItemPI = (id) => {
        const cambio = [...todos];
        const todo = cambio.find((todo) => todo.id === id)
        todo.eliminar = !todo.eliminar;
        setTodos(cambio)

        const newTodos = todos.filter((todo) => !todo.eliminar);
        setTodos(newTodos);
    }


    return (

        <Fragment>
            <h1>Post It Simulator!</h1>

            <div className="input-group mt-4 mb-4">
                <input ref={taskRef} placeholder='Título' className="form-control me-2" type="text"></input>
                <input ref={descRef} placeholder='Descripción' className="form-control me-2" type="text"></input>
                <input ref={imporRef} className="form-check-input ms-2" type="checkbox" id="miCheck"></input><label className="form-check-label ms-2" for="miCheck">Importante</label>
                <button onClick={agregarTarea} className="btn btn-dark ms-3 block">AGREGAR</button>                
            </div>

            <main>
                <section>
                    <div className="row">
                        {todos.map((todo) => (
                            <TodoItem todo={todo} key={todo.id} eliminarItem={eliminarItemPI}></TodoItem>
                        ))}
                    </div>                    
                </section>
            </main>
        </Fragment>
    );
}