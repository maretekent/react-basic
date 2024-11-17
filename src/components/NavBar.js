import React from "react";

const NavBar = () => {
	return (
		<>
			<ul className="navbar-nav">
				<li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
				<li className="nav-item d-lg-none"><a href="/#price-calculator" className="nav-link">Simple Price
					Calculator</a></li>
				<li className="nav-item"><a href="/self-storage-residential" className="nav-link">Residential</a></li>
				<li className="nav-item"><a href="/self-storage-business" className="nav-link">Business</a></li>
				<li className="nav-item"><a href="/self-storage-how-it-works" className="nav-link">How it Works</a></li>
			</ul>
		</>
	);
};

export default NavBar;
