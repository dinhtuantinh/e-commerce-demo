import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import './../css/Navbar.css';

const Navbar = () => {
    return (
        <AppBar className="header" position="static">
            <Toolbar >
                <NavLink to="/" className="spacing"> React JS Crud</NavLink>
                <NavLink to="all" className="spacing"> All Inter</NavLink>
                <NavLink to="add" className="spacing"> Add Inter</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;