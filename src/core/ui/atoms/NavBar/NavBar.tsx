import { Col, Form, Nav, Navbar, NavDropdown, NavLink, Row } from 'react-bootstrap';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import sessionStorageService from '../../../services/sessionStorageService';
import { UserNavBarIcon } from '../UserNavBarIcon/UserNavBarIcon';
import { useEffect, useState } from 'react';
import { Logo } from '@core/ui/atoms';
import { EmptyUserProps } from '@core/datatypes/UserProps';

import style from './NavBar.scss';
import restClient from '@core/services/restClient';
import { getRoleValue } from '@core/common/dataUtils';

export const NavBar = () => {
  const EMPTY_CHARACTER = '---';
  const [selectedCharacter, setSelectedCharacter] = useState(-1);
  const [userData, setUserData] = useState(EmptyUserProps);
  const [navExpanded, setNavExpanded] = useState(false);

  const doLogout = () => {
    restClient.logout().then(res => {
      if (res.ok) {
        sessionStorageService.remove('loggedUser');
        sessionStorageService.remove('selectedCharacter');
        window.location.href = '/login';
      }
    });
  };

  const closeNav = () => {
    setNavExpanded(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userSession = sessionStorageService.get('loggedUser');
      if (userSession) {
        setUserData(userSession);
        const character = sessionStorageService.get('selectedCharacter');
        if (character) {
          setSelectedCharacter(character);
        }
      }
    };
    loadUser();
  }, []);

  const onCharacterChange = character => {
    setSelectedCharacter(character);
    if (character !== -1) {
      sessionStorageService.saveOrUpdate('selectedCharacter', character);
    } else {
      sessionStorageService.remove('selectedCharacter');
      setSelectedCharacter(-1);
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
          {userData.id && userData.credential.role === 'ADMIN' && (
            <NavDropdown title="Admin" id="admin-dropdown">
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/schedule">Crea nuovo evento</NavDropdown.Item>
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/raids">Cerca eventi</NavDropdown.Item>
                <NavDropdown.Item onClick={closeNav} as={Link} to="/admin/editUser">Modifica utente</NavDropdown.Item>
            </NavDropdown>
          )}
          {userData.id && !isMobile && (
            <NavDropdown title="Raids" id="raids-dropdown" >
            <NavDropdown.Item onClick={closeNav} as={Link} to="/raids/grid">Griglia</NavDropdown.Item>
            <NavDropdown.Item onClick={closeNav} as={Link} to="/raids/calendar">Calendario</NavDropdown.Item>
            </NavDropdown>)
          }
          {userData.id && isMobile &&
          (<NavLink onClick={closeNav} as={Link} to="/raids/grid">Raids Disponibili</NavLink>)}
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
                      onChange={e => onCharacterChange(Number(e.target.value))}>
                      {userData.characters!.map(value => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.name} ( {getRoleValue(value.role.roleName!).tag} )
                          </option>
                        );
                      })}
                      <option key={0} value={-1}>{EMPTY_CHARACTER}</option>
                    </Form.Control>
                  </Col>
                  <Col md={4}>
                    <NavDropdown
                      title={<UserNavBarIcon username={userData.credential.username} />}
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
