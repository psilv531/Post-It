import React from 'react'

export function TodoItem({todo, eliminarItem}){

    const {id, task, descripcion, importante} = todo;

    const fnEliminarItem = () => {
        eliminarItem(id);
    }

    return <div className="col-xs-12 col-md-3">
            <article className="card rotate">
                <div className={importante}>
                    <div className="text-end">
                        <button onClick={fnEliminarItem} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="card-body mw-100">
                        <h4 className="card-title">{task}</h4>
                        <h5 className="card-title texto">{descripcion}</h5>                    
                    </div>
                </div>
            </article>
        </div>    
}