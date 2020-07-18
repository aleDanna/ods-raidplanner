import { Col, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import * as React from 'react';
import { Link } from 'react-router-dom';
import sessionStorageService from '../../../services/sessionStorageService';
import { UserNavBarIcon } from '../../atoms/UserNavBarIcon/UserNavBarIcon';
import { useEffect, useState } from 'react';
import { Logo } from '@core/ui/atoms';
import { EmptyUserProps } from '@core/datatypes/UserProps';

import style from './NavBar.scss';
import restClient from '@core/services/restClient';

export const NavBar = () => {
  const EMPTY_CHARACTER = '---';
  const [selectedCharacter, setSelectedCharacter] = useState(EMPTY_CHARACTER);
  const [userData, setUserData] = useState(EmptyUserProps);
  const [navExpanded, setNavExpanded] = useState(false);

  const doLogout = () => {
    restClient.logout().then(res => {
      if (res.ok) {
        sessionStorageService.remove('loggedUser');
        sessionStorageService.remove('selectedCharacter');
        location.href = '/login';
      }
    });
  };

  const closeNav = () => {
    setNavExpanded(false);
  }
  useEffect(() => {
    const loadUser = async () => {
      const userSession = sessionStorageService.get('loggedUser');
      if (userSession) {
        setUserData(userSession);
      }
    };
    loadUser();
  }, []);

  const onCharacterChange = character => {
    setSelectedCharacter(character);
    if (character !== EMPTY_CHARACTER) {
      sessionStorageService.saveOrUpdate('selectedCharacter', character);
    } else {
      sessionStorageService.remove('selectedCharacter');
      setSelectedCharacter(EMPTY_CHARACTER);
    }
  };

  return (
    <Navbar expand="md" className={style.navbar}
            onToggle={(value) => setNavExpanded(value)}
            expanded={navExpanded}>
      <Navbar.Brand>
        <Link to="/">
          <Logo />
        </Link>
      </Navbar.Brand>
      {userData.id &&
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      }
      <Navbar.Collapse id="basic-navbar-nav" className={style.links}>
        <Nav className="mr-auto">
          {userData.id && userData.role === 'ADMIN' && (
            <NavDropdown title="Admin" id="admin-dropdown">
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/schedule">Crea nuovo evento</NavDropdown.Item>
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/raids">Cerca eventi</NavDropdown.Item>
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/editUser">Modifica utente</NavDropdown.Item>
            </NavDropdown>
          )}
          {userData.id && (
            <NavDropdown title="Raids" id="raids-dropdown" >
                <NavDropdown.Item onClick={closeNav} as={Link} to="/raids/grid">Griglia</NavDropdown.Item>
                <NavDropdown.Item onClick={closeNav} as={Link} to="/raids/calendar">Calendario</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <Nav>
          {userData.id && (
            <>
              <Row>
                <Form inline>
                  <Col md={2}>
                    <Form.Label column md={4}>
                      Personaggio
                    </Form.Label>
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      as="select"
                      value={selectedCharacter}
                      onChange={e => onCharacterChange(e.target.value)}>
                      {userData.characters.map(value => {
                        return (
                          <option key={value.characterid} value={value.characterid}>
                            {value.charactername} ( {value.rolename} )
                          </option>
                        );
                      })}
                      <option key={0} defaultValue={selectedCharacter}>
                        {EMPTY_CHARACTER}
                      </option>
                    </Form.Control>
                  </Col>
                  <Col md={4}>
                    <NavDropdown
                      title={<UserNavBarIcon username={userData.username} />}
                      id="user-dropdown">
                        <NavDropdown.Item onClick={closeNav} as={Link} to="/profile">Profilo</NavDropdown.Item>
                        <NavDropdown.Item onClick={closeNav} as={Link} to="/characters">Personaggi</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {
                          closeNav();
                          doLogout();
                        }} as={Link} to="#">
                          Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                </Form>
              </Row>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
