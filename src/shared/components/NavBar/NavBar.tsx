import {Col, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import * as React from "react";
import {Link} from "react-router-dom";
import sessionStorageService from "@shared/services/sessionStorageService";
import {UserNavBarIcon} from "@shared/fragments/icons/UserNavBarIcon";
import {useState} from "react";

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
                    {userData && userData.role === 'ADMIN' &&
                        <NavDropdown title="Admin" id="admin-dropdown">
                            <NavDropdown.Item>
                                <Link to="/rp/admin/schedule">Crea nuovo evento</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/rp/admin/raids">Cerca eventi</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/rp/admin/editUser">Modifica utente</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
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
                                <Row>
                                    <Form.Label column md={4}>
                                        Personaggio
                                    </Form.Label>
                                    <Col md={8}>
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
                                    </Col>
                                </Row>
                            </Form>
                            <NavDropdown className="ods_raidplanner_navbar-user-dropdown" title={<UserNavBarIcon />} id="raids-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/rp/profile">Profilo</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/rp/characters">Personaggi</Link>
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
                sessionStorageService.remove("selectedCharacter");
                window.location.href = "/rp/login";
            }
        })
}
