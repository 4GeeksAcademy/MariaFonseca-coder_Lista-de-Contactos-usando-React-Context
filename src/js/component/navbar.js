import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);
	const [alertType, setAlertType] = useState(null); // Controla el tipo de alerta (success o primary)

	const handleCreateAgenda = async () => {
		const response = await actions.createAgenda();
		if (response.created === true) {
			setAlertType("success"); // Agenda creada con éxito
		} else if (response.created === false) {
			setAlertType("primary"); // Agenda ya creada
		}

		// Ocultar la alerta después de 3 segundos
		setTimeout(() => setAlertType(null), 3000);
	};

	return (
		<>
			<nav className="navbar navbar-light mb-3" style={{ backgroundColor: "#efd8ff" }}>
				<Link to="/" className="text-decoration-none" style={{ marginLeft: "15px" }}>
					<h1
						className="navbar-brand fs-4"
						style={{ color: "#505050", fontFamily: "'Sour Gummy', sans-serif" }}
					>
						Contacts
					</h1>
				</Link>

				<div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
					{/* Botón para crear la agenda */}
					<button
						className="btn btn-success"
						style={{ fontFamily: "'Sour Gummy', sans-serif", marginRight: "15px" }}
						onClick={handleCreateAgenda}
					>
						Create Agenda
					</button>

					{/* Botón para agregar un nuevo contacto */}
					<Link to="/createContact" className="text-decoration-none">
						<button
							className="btn btn-primary"
							style={{ fontFamily: "'Sour Gummy', sans-serif", marginRight: "15px" }}
						>
							Add new contact
						</button>
					</Link>
				</div>
			</nav>

			{/* Mostrar alerta dependiendo del estado */}
			{alertType === "success" && (
				<div className="alert alert-success mt-2" role="alert" style={{ marginLeft: "15px" }}>
					MariaFonseca's agenda has been created successfully!
				</div>
			)}
			{alertType === "primary" && (
				<div className="alert alert-primary mt-2" role="alert" style={{ marginLeft: "15px" }}>
					The agenda has already been created before!
				</div>
			)}
		</>
	);
};