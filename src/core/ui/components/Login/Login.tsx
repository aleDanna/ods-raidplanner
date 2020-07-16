import React from 'react';
import { Jumbotron, Button, Form, Container, Row, Alert, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import sessionStorageService from '@core/services/sessionStorageService';

import styles from './Login.scss';
import restClient from '@core/services/restClient';

interface LoginProps {
  history: any;
}

export const Login = ({ history }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [badCredentialShow, setBadCredentialShow] = useState(false);

  const login = (evt: any) => {
    const form = evt.currentTarget;

    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      restClient
        .login({
          username: username,
          password: password
        })
        .then(res => {
          if (res.status === 405) {
            setBadCredentialShow(true);
            setValidated(false);
          } else {
            sessionStorageService.saveOrUpdate('loggedUser', res);
            history.push('/');
            history.go();
          }
        });
    }

    setValidated(true);
    evt.preventDefault();
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Alert variant="danger" show={badCredentialShow}>
          Username o password errati
        </Alert>
      </Row>
      <Row className="justify-content-md-center">
        <Jumbotron className={styles.jumbotron}>
          <Form noValidate validated={validated} onSubmit={login}>
            <Form.Group controlId="formLogin">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
              <Form.Text className="text-muted">Inserisci il tuo username di ODS Raidplanner</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <span>or </span>
                <Link to="/signup">signup</Link>
              </Form.Group>
            </Form.Row>
          </Form>
        </Jumbotron>
      </Row>
    </Container>
  );
};
