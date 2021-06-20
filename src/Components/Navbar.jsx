import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand>Todo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Create" id="create-dropdown">
                        <NavDropdown.Item>
                            <LinkContainer to="/create/category">
                                <Nav.Link >Create Category</Nav.Link>
                            </LinkContainer>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <LinkContainer to="/create/todo">
                                <Nav.Link>Create Todo</Nav.Link>
                            </LinkContainer>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
