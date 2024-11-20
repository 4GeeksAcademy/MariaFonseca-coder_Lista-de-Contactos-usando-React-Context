import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav
			className="navbar navbar-light mb-3"
			style={{ backgroundColor: "#FADCD9" }}
		>
			<Link to="/" className="text-decoration-none" style={{ marginLeft: "15px" }}>
				<h1 className="navbar-brand" style={{ color: "#505050", fontFamily: "'Sour Gummy', sans-serif" }}
				>Contactos</h1>
			</Link>
			<div className="btn-newContact" style={{ marginRight: "15px" }}>
				<Link to="/createContact" className="text-decoration-none">
					<button className="btn btn-primary" style={{ fontFamily: "'Sour Gummy', sans-serif" }}>Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};