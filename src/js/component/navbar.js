import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);
	const [alertType, setAlertType] = useState(null);

	const handleCreateAgenda = async () => {
		const response = await actions.createAgenda();
		if (response.created === true) {
			setAlertType("success");
		} else if (response.created === false) {
			setAlertType("primary");
		}

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
					<button
						className="btn btn-success"
						style={{ fontFamily: "'Sour Gummy', sans-serif", marginRight: "15px" }}
						onClick={handleCreateAgenda}
					>
						Create Agenda
					</button>

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

			{alertType === "success" && (
				<div className="alert alert-success mt-2" role="alert">
					MariaFonseca's agenda has been created successfully!
				</div>
			)}
			{alertType === "primary" && (
				<div className="alert alert-primary mt-2" role="alert">
					The agenda has already been created before!
				</div>
			)}
		</>
	);
};