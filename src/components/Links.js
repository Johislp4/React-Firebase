import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from '../firebase'
import { toast } from "react-toastify";


const Link = () => {

    //Como queremos mostrar los datos tenemos que manejar el estado para estos
    const [links, setLinks] = useState([]);
    //Estado para manejar la ACTUALIZACIÓN de un registro
    const [currentId, setCurrentId] = useState('');


    const addOrEditLink = async (linkObjet) => { //LinkObjet son los datos que quiero guardar y que vienen de LinkForm

        //Bloque Try-Catch para manejar los errores
        try {
            if (currentId === '') {
                //GUARDANDO los datos en la db de firebase
                await db.collection('links').doc().set(linkObjet);
                toast('Nuevo link agregado', {
                    type: 'success'
                })
            } else {
                await db.collection('links').doc(currentId).update(linkObjet);
                toast('Enlace actualizado', {
                    type: 'info'
                });
    
                //Una vez se actualice debemos resetear el CurrentId para que deje de hacer peticiones
                setCurrentId('');
            }
        }catch (error){
            console.log(error);
        }




    }

    //BORRANDO información
    const onDeleteLink = async (id) => {
        if (window.confirm('Estás seguro de eliminar el registro?')) {
            await db.collection('links').doc(id).delete();
            toast('Enlace removido', {
                type: 'error',
                autoClose: 2000
            })
        }
    }

    //LEYENDO información de la base de datos
    const getLinks = async () => {
        //OnSnapshot es un método que mantiene la escucha ejecuta una función cada vez que los datos cambien (diferente a get() que solo trae los datos una vez )
        // const querySnapshot = await db.collection('links').get();
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = []; //se crea porque queremos agregar el id de la colección al estado
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id }) //agregando el id a los datos que tra la db
            })

            setLinks(docs);

        });

    }

    useEffect(() => {
        //cada vez que se cargue la página mostrará los datos que se traen de la db
        getLinks();
    }, [])

    return (
        <div>
            <LinkForm {...{ addOrEditLink, currentId, links }} />
            <div className="col-md-8">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank">Go to Wesite</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Link;