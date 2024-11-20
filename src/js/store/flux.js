const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],  //Inicialmente en 0 contactos
        },
        actions: {
            getContacts: async () => {
                try {
                    const res = await fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca");
                    if (res.ok) {
                        const data = await res.json();
                        setStore({ contacts: data.contacts });
                    }
                } catch (error) {
                    console.error("Error al obtener los contactos:", error);
                }
            },

            postContact: async (newContact) => {
                try {
                    const res = await fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newContact),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        console.log("Contacto agregado:", data);

                        setStore((prevStore) => ({
                            contacts: [...prevStore.contacts, data.contact]  //Agregar el nuevo contacto a la lista
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

            deleteContact: async (contactId) => {
                try {
                    const res = await fetch(`https://playground.4geeks.com/contact/agendas/MariaFonseca/contacts/${contactId}`, {
                        method: "DELETE",
                    });

                    if (res.ok) {
                        setStore((prevStore) => ({
                            contacts: prevStore.contacts.filter((contact) => contact.id !== contactId),
                        }));
                        console.log(`Contacto con ID ${contactId} eliminado.`);
                    } else {
                        console.error("Error al eliminar el contacto:", res.statusText);
                    }
                } catch (error) {
                    console.error("Error al eliminar el contacto:", error);
                }
            },
            createAgenda: async () => {
                try {
                    const res = await fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca", {
                        method: "POST",
                    });

                    if (res.ok) {
                        console.log("Agenda de MariaFonseca creada con éxito.");
                        return { created: true };
                    } else if (res.status === 400) {
                        console.warn("La agenda ya ha sido creada anteriormente.");
                        return { created: false };
                    } else {
                        console.error("Error al crear la agenda:", res.statusText);
                        return { created: null };
                    }
                } catch (error) {
                    console.error("Error al crear la agenda:", error);
                    return { created: null };
                }
            },
        }
    };
};

export default getState;