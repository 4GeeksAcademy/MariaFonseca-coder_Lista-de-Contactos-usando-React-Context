const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[]
		},
		actions: {
			getContacts:()=>{
				fetch("https://playground.4geeks.com/contact/agendas/MariaFonseca")
				.then((result)=>result.json())
				.then(data=> setStore({contacts:data.contacts}))
				.catch((error)=> console.log(error))
			}
		}
	};
};

export default getState;
