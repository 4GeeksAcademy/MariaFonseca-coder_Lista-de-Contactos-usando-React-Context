import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const CreateContact = () => {
    const { actions } = useContext(Context);

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.postContact(newContact);
        setNewContact({
            name: "",
            email: "",
            phone: "",
            address: ""
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        name="name"
                        value={newContact.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <label htmlFor="floatingName">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingEmail"
                        name="email"
                        value={newContact.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingEmail">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingPhone"
                        name="phone"
                        value={newContact.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                    />
                    <label htmlFor="floatingPhone">Phone</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingAddress"
                        name="address"
                        value={newContact.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <label htmlFor="floatingAddress">Address</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Contact
                </button>
            </form>
        </div>
    );
};