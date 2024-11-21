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
			<nav className="navbar navbar-light mb-3" style={{ backgroundColor: "#c1d8ff" }}>
				<Link to="/" className="text-decoration-none" style={{ marginLeft: "15px" }}>
					<h1
						className="navbar-brand fs-4"
						style={{ color: "#4d5052", fontFamily: "'Sour Gummy', sans-serif" }}
					>
						Contacts
					</h1>
				</Link>
				<button //Botón de Hamburguesa
					className="navbar-toggler me-3"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasNavbar"
					aria-controls="offcanvasNavbar"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div //Menú de la Hamburguesa
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasNavbarLabel">
							Menu
						</h5>
						<button
							type="button"
							className="btn-close text-reset"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div className="offcanvas-body">
						<div className="d-flex flex-column gap-2">
							<button
								className="btn btn-success w-100"
								style={{ fontFamily: "'Sour Gummy', sans-serif" }}
								onClick={handleCreateAgenda}
							>
								Create Agenda
							</button>
							<Link to="/createContact" className="text-decoration-none">
								<button
									className="btn btn-primary w-100"
									style={{ fontFamily: "'Sour Gummy', sans-serif" }}
								>
									Add contact
								</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Alerts */}
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