import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactIdToDelete, setContactIdToDelete] = useState(null);

    // Obtener los contactos cuando el componente se monta
    useEffect(() => {
        actions.getContacts();
    }, [actions]);

    // Función para manejar la confirmación de eliminación
    const handleDeleteClick = (id) => {
        setContactIdToDelete(id);  // Guardamos el id del contacto a eliminar
        setShowModal(true);        // Mostramos el modal de confirmación
    };

    const confirmDelete = () => {
        if (contactIdToDelete) {
            actions.deleteContact(contactIdToDelete);  // Llamamos a la acción para eliminar el contacto
        }
        setShowModal(false);  // Cerramos el modal
    };

    const cancelDelete = () => {
        setShowModal(false);  // Si se cancela, solo cerramos el modal
    };

    // Mostrar el modal de confirmación
    const renderModal = () => (
        <div className="modal" style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-content">
                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                <button onClick={confirmDelete}>Sí, eliminar</button>
                <button onClick={cancelDelete}>Cancelar</button>
            </div>
        </div>
    );

    return (
        <div>
            {store.contacts && store.contacts.length > 0 ? (
                store.contacts.map((contact, index) => (
                    <div className="card mb-1" style={{ width: "1000px", height: "200px", margin: "auto" }} key={index}>
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${index + 1}`}
                                    className="img-fluid rounded-start"
                                    alt="Contacto"
                                    style={{ width: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">Email: {contact.email}</p>
                                    <p className="card-text">Teléfono: {contact.phone}</p>
                                    <p className="card-text">Dirección: {contact.address}</p>
                                </div>
                                <div className="position-absolute top-0 end-0 p-2">
                                    <Link to={`/editContact/${contact.id}`}>
                                        <button className="btn btn-outline-primary me-2">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </button>
                                    </Link>
                                    <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(contact.id)}>
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

            {renderModal()}  {/* Modal de confirmación */}
        </div>
    );
};