import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { PostItItem } from './PostItItem';

const KEY = "PostItList-PostIt"

export function PostItList(){

    const [postIts, setPostIts] = useState([]);

    const tareaRef = useRef();
    const descRef = useRef();
    const imporRef = useRef();

    useEffect(() => {
        const storedPostIts = JSON.parse(localStorage.getItem(KEY));
        if (storedPostIts){
            setPostIts(storedPostIts);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(postIts));
    }, [postIts])

    const agregarTarea = () => {        
        const tarea = tareaRef.current.value;
        const descripcion = descRef.current.value;
        const importante = 'importante'; 
        const normal = 'normal';

        if (descripcion === '') return;

        if (imporRef.current.checked){
            setPostIts((prevTareas) => {
                const newTarea = {
                    id: uuid(),
                    tarea: tarea,
                    descripcion: descripcion,
                    importante: importante,
                    eliminar: false
                }
    
                return [...prevTareas, newTarea]
            })    
        }
        else{
            setPostIts((prevTareas) => {
                const newTarea = {
                    id: uuid(),
                    tarea: tarea,
                    descripcion: descripcion,
                    importante: normal,
                    eliminar: false
                }
    
                return [...prevTareas, newTarea]
            })
        }        

        tareaRef.current.value = null;
        descRef.current.value = null;
        imporRef.current.checked = false;
    }

    const eliminarPostIt = (id) => {
        const cambio = [...postIts];
        const postIt = cambio.find((postIt) => postIt.id === id)
        postIt.eliminar = !postIt.eliminar;
        setPostIts(cambio)

        const newPostIt = postIts.filter((postIt) => !postIt.eliminar);
        setPostIts(newPostIt);
    }


    return (

        <Fragment>
            <h1>Post It Simulator!</h1>

            <div className="input-group mt-4 mb-4">
                <input ref={tareaRef} placeholder='Título' className="form-control me-2" type="text"></input>
                <input ref={descRef} placeholder='Descripción' className="form-control me-2" type="text"></input>
                <input ref={imporRef} className="form-check-input ms-2" type="checkbox" id="miCheck"></input><label className="form-check-label ms-2" for="miCheck">Importante</label>
                <button onClick={agregarTarea} className="btn btn-dark ms-3 block">AGREGAR</button>                
            </div>

            <main>
                <section>
                    <div className="row">
                        {postIts.map((postIt) => (
                            <PostItItem postIt={postIt} key={postIt.id} eliminarPostIt={eliminarPostIt}></PostItItem>
                        ))}
                    </div>                    
                </section>
            </main>
        </Fragment>
    );
}