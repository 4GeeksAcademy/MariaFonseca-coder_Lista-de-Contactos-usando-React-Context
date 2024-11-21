import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = () => {
    const { store, actions } = useContext(Context);

    //Obtener contactos cuando el componente se monta
    useEffect(() => {
        actions.getContacts();
    }, [actions]);

    const handleDelete = (contactId) => {
        actions.deleteContact(contactId); //Elimina el contacto desde el store
    };

    return (
        <div style={{ fontFamily: "'Sour Gummy', sans-serif" }} className="container">
            {store.contacts.length > 0 ? (
                store.contacts.map((contact) => (
                    <div className="card mb-3 mx-auto" key={contact.id} style={{ maxWidth: "100%" }}>
                        <div className="row g-0">
                            <div className="col-12 col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${contact.id}`}
                                    className="img-fluid rounded-start"
                                    alt="Contacto"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "0.5rem 0 0 0.5rem",
                                    }}
                                />
                            </div>
                            <div className="col-12 col-md-8 d-flex flex-column">
                                <div className="card-body text-start flex-grow-1">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">{contact.email}</p>
                                    <p className="card-text">{contact.phone}</p>
                                    <p className="card-text">{contact.address}</p>
                                </div>
                                <div className="d-flex justify-content-end align-items-center p-2">
                                    <Link to={`/editContact/${contact.id}`} className="btn btn-outline-primary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteModal${contact.id}`}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal fade"
                            id={`deleteModal${contact.id}`}
                            tabIndex="-1"
                            aria-labelledby="deleteModalLabel"
                            aria-hidden="true">
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
                ))
            ) : (
                <p>There are no contacts available, add contacts or create the address book if it has not been created <br />
                    Open the menu  <i class="fa-solid fa-arrow-right"></i>
                </p>
            )}
        </div>
    );
};