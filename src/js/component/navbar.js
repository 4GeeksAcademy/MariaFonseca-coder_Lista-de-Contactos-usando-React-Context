import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="btn-newContact" style={{marginRight: "10px"}}>
				<Link to="/createContact">
					<button className="btn btn-primary">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
