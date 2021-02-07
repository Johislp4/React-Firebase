import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

const LinkForm = (props) => {
    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }   

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        //limpiando los campos del formulario una vez se envían (también se debe poner el Value a los inputs porque o si no, no se limpiaran)
        setValues({...initialStateValues});
    }

    //Actualizando datos
    const getLinkById = async(id) =>{
        const doc = await db.collection('links').doc(id).get();
        //llenando el formulario con los datos que trae el registro del ID correspondiente
        setValues({...doc.data()});
    }

    useEffect(()=>{
        if(props.currentId === ''){
            setValues({...initialStateValues});
        }else{
           getLinkById(props.currentId);
        }
    },[props.currentId]);

    return (
        <form className="card car-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light"><i className="material-icons">insert_link</i></div>
                <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="https://someurl.com"
                    onChange={handleInputChange}
                    value={values.url} //importante para resetear los campos del form 
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light"><i className="material-icons">create</i></div>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Website name"
                    onChange={handleInputChange}
                    value={values.name}
                     />


            </div>

            <div className="form-group">
                <textarea
                    name="description"
                    rows="10"
                    className="form-control"
                    placeholder="Descripción"
                    onChange = {handleInputChange}
                    value={values.description}
                    ></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Guardar' : 'Actualizar' }
            </button>
        </form>
    );

}

export default LinkForm;