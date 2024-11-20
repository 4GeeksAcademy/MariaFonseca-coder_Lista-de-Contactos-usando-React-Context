import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<h1 className="navbar-brand">Lista de Contactos</h1>
			</Link>
			<div className="btn-newContact" style={{ marginRight: "10px" }}>
				<Link to="/createContact">
					<button className="btn btn-primary">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};