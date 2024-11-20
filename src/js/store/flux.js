const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],  // Inicialmente no hay contactos
        },
        actions: {
            // Obtener los contactos desde la API
            getContacts: async () => {
                try {
                    const res = await fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca");
                    if (res.ok) {
                        const data = await res.json();
                        setStore({ contacts: data.contacts });  // Guardamos los contactos obtenidos en el store
                    }
                } catch (error) {
                    console.error("Error al obtener los contactos:", error);
                }
            },

            // Agregar un nuevo contacto a la API
            postContact: async (newContact) => {
                try {
                    // Realizar la solicitud POST para agregar el nuevo contacto
                    const res = await fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newContact),
                    });

                    // Si la respuesta es exitosa, procesamos la respuesta
                    if (res.ok) {
                        const data = await res.json();
                        console.log("Contacto agregado:", data);

                        // Actualizamos el store con el nuevo contacto
                        setStore((prevStore) => ({
                            contacts: [...prevStore.contacts, data.contact]  // Agregar el nuevo contacto a la lista
                        }));
                    } else {
                        console.error("Error al agregar el contacto:", res.statusText);
                    }
                } catch (error) {
                    console.error("Error al agregar el contacto:", error);
                }
            },
            putContact: async (updatedContact) => {
                try {
                    const res = await fetch(`https://playground.4geeks.com/contact/agendas/MariaFonseca/contacts/${updatedContact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedContact),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setStore((prevStore) => ({
                            contacts: prevStore.contacts.map((contact) =>
                                contact.id === updatedContact.id ? data.contact : contact
                            ),
                        }));
                    } else {
                        console.error("Error al actualizar el contacto:", res.statusText);
                    }
                } catch (error) {
                    console.error("Error al actualizar el contacto:", error);
                }
            },
        }
    };
};

export default getState;