import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as React from "react";
import {Link} from "react-router-dom";
import sessionStorageService from "@shared/services/sessionStorageService";
import {UserNavBarIcon} from "@shared/fragments/icons/UserNavBarIcon";

export const NavBar = () => {

    return (
        <Navbar bg="light" expand="lg" className="ods_raidplanner_navbar">
            <Navbar.Brand>
                <Link to="/rp/home">
                    <img alt=""
                         width="400"
                         height="60"
                         className="d-inline-block align-top"
                         src={require(`../../images/teso.png`)} />
                </Link>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className="ods_raidplanner_navbar-links">
                <Nav className="mr-auto">
                    <NavDropdown title="Raids" id="raids-dropdown">
                        <NavDropdown.Item >
                            <Link to="/rp/raids/grid">Griglia</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/rp/raids/calendar">Calendario</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Navbar.Toggle />
                <Nav>
                    {sessionStorageService.get("loggedUser") &&
                    <NavDropdown className="ods_raidplanner_navbar-user-dropdown" title={<UserNavBarIcon />} id="raids-dropdown">
                        <NavDropdown.Item>
                            <Link to="/rp/raids/calendar">Calendario</Link>
                        </NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
