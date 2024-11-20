import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const contactToEdit = store.contacts.find((c) => c.id === parseInt(id));
        if (contactToEdit) {
            setContact(contactToEdit);
        }
    }, [store.contacts, id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.putContact(contact);
        navigate("/"); //Redirigir después de actualizar
    };

    if (!contact) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="container" style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
            <h2 className="mt-4">Edit Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name || ""}
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
                        value={contact.email || ""}
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
                        value={contact.phone || ""}
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
                        value={contact.address || ""}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <label>Address</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};