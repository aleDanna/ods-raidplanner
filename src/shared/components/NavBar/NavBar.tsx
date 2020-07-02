import {Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as React from "react";
import {Link} from "react-router-dom";
import sessionStorageService from "@shared/services/sessionStorageService";
import {UserNavBarIcon} from "@shared/fragments/icons/UserNavBarIcon";
import {useState} from "react";
import {neverSettle} from "react-async";

export const NavBar = () => {
    const EMPTY_CHARACTER = "---";
    const userData = sessionStorageService.get("loggedUser");
    const [selectedCharacter, setSelectedCharacter] = useState(sessionStorageService.get("selectedCharacter") || EMPTY_CHARACTER);

    const onCharacterChange = (character) => {
        setSelectedCharacter(character);
        if (character !== EMPTY_CHARACTER) {
            sessionStorageService.saveOrUpdate("selectedCharacter", character);
        }
        else {
            sessionStorageService.remove("selectedCharacter");
            setSelectedCharacter(EMPTY_CHARACTER);
        }
    }
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
                    {userData && (
                        <>
                            <Form inline>
                                <Form.Label className="my-1 mr-2" >
                                    Personaggio
                                </Form.Label>
                                <Form.Control id="characterForm" as="select" value={selectedCharacter} onChange={e => onCharacterChange(e.target.value)}>
                                    {
                                        userData.characters.map((value) => {
                                            return <option
                                                key={value.character_id} value={value.character_id}>
                                                {value.character_name} ( {value.role_name} )
                                            </option>
                                        })
                                    }
                                    <option key={0} defaultValue={selectedCharacter}>{EMPTY_CHARACTER}</option>
                                </Form.Control>
                            </Form>
                            <NavDropdown className="ods_raidplanner_navbar-user-dropdown" title={<UserNavBarIcon />} id="raids-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/rp/profile">Profilo</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="#" onClick={doLogout}>Logout</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


const doLogout = () => {
    fetch('http://localhost:9000/auth/logout', {
        method: 'GET'
    })
        .then(res => {
            if (res.ok) {
                sessionStorageService.remove("loggedUser");
                window.location.href = "/rp/login";
            }
        })
}
