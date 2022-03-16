import React from "react";
import { Link } from "react-router-dom";

const Navigator = ({userObj}) => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">{userObj.displayName}</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Home</Link></li>
    </ul>
)

export default Navigator;