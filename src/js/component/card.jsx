import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Card = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div>
            {store.contacts && store.contacts.length > 0 ? (
                store.contacts.map((contact, index) => (
                    <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="Contacto" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{contact.full_name}</h5>
                                    <p className="card-text">Email: {contact.email}</p>
                                    <p className="card-text">Teléfono: {contact.phone}</p>
                                    <p className="card-text">Dirección: {contact.address}</p>
                                    <p className="card-text"><small className="text-muted">Última actualización hace 3 minutos</small></p>
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