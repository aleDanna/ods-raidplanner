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
    <Navbar expand="md" className={style.navbar}>
      <Navbar.Brand>
        <Link to="/">
          <Logo />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={style.links}>
        <Nav className="mr-auto">
          {userData.id && userData.role === 'ADMIN' && (
            <NavDropdown title="Admin" id="admin-dropdown">
              <NavDropdown.Item>
                <Link to="/admin/schedule">Crea nuovo evento</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/admin/raids">Cerca eventi</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/admin/editUser">Modifica utente</Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <NavDropdown title="Raids" id="raids-dropdown">
            <NavDropdown.Item>
              <Link to="/raids/grid">Griglia</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/raids/calendar">Calendario</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {userData.id && (
            <>
              <Form inline>
                <Row>
                  <Form.Label column md={4}>
                    Personaggio
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      id="characterForm"
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
                </Row>
              </Form>
              <NavDropdown
                title={<UserNavBarIcon username={userData.username} />}
                id="raids-dropdown">
                <NavDropdown.Item>
                  <Link to="/profile">Profilo</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/characters">Personaggi</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="#" onClick={doLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const doLogout = () => {
  restClient.logout().then(res => {
    if (res.ok) {
      sessionStorageService.remove('loggedUser');
      sessionStorageService.remove('selectedCharacter');
      location.href = '/login';
    }
  });
};
