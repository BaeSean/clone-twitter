import React from "react";
import { Link } from "react-router-dom";

const Navigator = () => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Home</Link></li>
    </ul>
)

export default Navigator;