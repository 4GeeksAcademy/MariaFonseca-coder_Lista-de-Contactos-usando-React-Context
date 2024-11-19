import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import muchacha1 from "../../img/muchacha1.jpg";

export const Card = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div>
            {store.contacts && store.contacts.length > 0 ? (
                store.contacts.map((contact, index) => (
                    <div className="card mb-1" style={{ width: "1000px", height: "200px", margin: "auto" }} key={index}>
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${index + 1}`}
                                    className="img-fluid rounded-start" style={{ width: "100%", objectFit: "cover" }}
                                    alt="Contacto"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{contact.full_name}</h5>
                                    <p className="card-text">Email: {contact.email}</p>
                                    <p className="card-text">Teléfono: {contact.phone}</p>
                                    <p className="card-text">Dirección: {contact.address}</p>
                                    <p className="card-text"><small className="text-muted"></small></p>
                                </div>
                                <div className="position-absolute top-0 end-0 p-2">
                                    <button className="btn btn-outline-primary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-outline-danger">
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay contactos disponibles.</p>
            )}
        </div>
    );
};