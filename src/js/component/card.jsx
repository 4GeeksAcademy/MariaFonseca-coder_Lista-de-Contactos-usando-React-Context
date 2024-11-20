import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = () => {
    const { store, actions } = useContext(Context);

    //Obtener contactos cuando el componente se monta
    useEffect(() => {
        actions.getContacts();
    }, [actions]);

    const handleDelete = (contactId) => {
        actions.deleteContact(contactId);  //Elimina el contacto desde el store
    };

    return (
        <div style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
            {store.contacts.length > 0 ? (
                store.contacts.map((contact) => (
                    <div className="card mb-1" key={contact.id} style={{ width: "1000px", margin: "auto", position: "relative" }}>
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${contact.id}`}
                                    className="img-fluid rounded-start"
                                    alt="Contacto"
                                    style={{ width: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">{contact.email}</p>
                                    <p className="card-text">{contact.phone}</p>
                                    <p className="card-text">{contact.address}</p>
                                </div>
                                <div className="position-absolute top-0 end-0 p-3">
                                    <Link to={`/editContact/${contact.id}`} className="btn btn-outline-primary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteModal${contact.id}`}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                    <div className="modal fade" id={`deleteModal${contact.id}`} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="deleteModalLabel">Delete Contact</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure you want to delete {contact.name}?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(contact.id)}
                                                        data-bs-dismiss="modal">
                                                        Yes, delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay contactos disponibles, agrega contactos o crea la agenda si no se ha creado</p>
            )}
        </div>
    );
};