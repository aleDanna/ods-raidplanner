import {Form, FormControl, InputGroup, Nav, Navbar, NavDropdown} from "react-bootstrap";
import * as React from "react";
import {Link} from "react-router-dom";
import sessionStorageService from "@shared/services/sessionStorageService";
import {UserNavBarIcon} from "@shared/fragments/icons/UserNavBarIcon";
import {useState} from "react";

export const NavBar = () => {
    const EMPTY_CHARACTER = "---";
    const userData = sessionStorageService.get("loggedUser");
    const [selectedCharacter, setSelectedCharacter] = useState(sessionStorageService.get("selectedCharacter"));

    const onCharacterChange = (character) => {
        setSelectedCharacter(character);
        if (character !== EMPTY_CHARACTER) {
            sessionStorageService.saveOrUpdate("selectedCharacter", character);
        }
        else {
            sessionStorageService.remove("selectedCharacter");
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
                                    <option key={0} selected={!selectedCharacter} defaultValue={EMPTY_CHARACTER}>{EMPTY_CHARACTER}</option>
                                </Form.Control>
                            </Form>
                            <NavDropdown className="ods_raidplanner_navbar-user-dropdown" title={<UserNavBarIcon />} id="raids-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/rp/profile">Profilo</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
