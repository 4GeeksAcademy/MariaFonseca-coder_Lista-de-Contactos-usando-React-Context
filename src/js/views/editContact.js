import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();  // Obtén el id de la URL usando useParams
    const [contact, setContact] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Hook para redirigir después de la actualización
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar el contacto que deseas editar
        const contactToEdit = store.contacts.find(c => c.id === parseInt(id));  // Usa el id obtenido desde useParams
        if (contactToEdit) {
            setContact(contactToEdit);  // Setea los datos en el estado local
        }
    }, [store.contacts, id]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Actualiza el contacto en la API
        await actions.putContact(contact);
        // Redirige al listado de contactos (puedes ajustar la URL según tu necesidad)
        navigate("/contacts");
    };

    return (
        <div>
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <label>Full Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <label>Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                    />
                    <label>Phone</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <label>Address</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Update Contact
                </button>
            </form>
        </div>
    );
};