const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
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
                    console.error("Error al obtener la lista de contactos:", error);
                }
            }
        }
    };
};

export default getState;