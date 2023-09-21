import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="main-nav">
            <div className="project-title">
                <div className="image-background">
                <img src="muscle.png" alt=""/>
                </div>
                <h2>Gym Management</h2>                
            </div>
            <div className="nav-links">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/aboutus">About Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
