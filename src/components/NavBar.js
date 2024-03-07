import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import './NavBar.css';
import {MoonFill,Moon} from 'react-bootstrap-icons';

const NavBar = () => {
    const [darkMode, setDarkMode] = React.useState(false);

    const handleModeSwitch = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <Navbar expand="lg" className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
                <Navbar.Brand href="#">
                    <img
                        src={process.env.PUBLIC_URL + "/logoInvictum.png"}
                        width="100%"
                        height="70px"
                        style={{ marginLeft: "20%" }}
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="right-aligned">
                    <Nav className="ml-auto">
                        <NavDropdown title="Inversiones" id="basic-nav-dropdown">
                            {/* Dropdown menu items */}
                        </NavDropdown>
                        <NavDropdown title="Educacion" id="basic-nav-dropdown">
                            {/* Dropdown menu items */}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Button variant="secondary" id="standardButton">Iniciar Sesion</Button>
                        <Button variant="primary" id="standardButton">Empezar</Button>
                        <Button variant="light" onClick={handleModeSwitch} id="standardButton">
                            {darkMode ?  <MoonFill/>: <Moon/>}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBar;