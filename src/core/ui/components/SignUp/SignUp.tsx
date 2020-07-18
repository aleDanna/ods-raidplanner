import * as React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import restClient from '@core/services/restClient';

import styles from './SignUp.scss';
import { fieldChecker } from '@core/common/dataUtils';

export const SignUp = ({history}) => {

  const [validated, setValidated] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [validESOUsername, setValidESOUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [usernameError, setUsernameError] = useState('');
  const [esoUsernameError, setEsoUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [esoUsername, setEsoUsername] = useState('');

  const onUsernameChange = (newUsername) => {
    const invalidCheck = fieldChecker(newUsername);
    if (newUsername.length >= 3) {
      restClient.checkAvailableUsername(newUsername)
        .then((res) => {
          if (invalidCheck) {
            setUsernameError('UNALLOWED_CHARS');
          } else if (!res.isValid) {
            setUsernameError('ALREADY_IN_USE');
          }
          setValidUsername(res.isValid && !invalidCheck);
        });
    } else {
      if (invalidCheck) {
        setUsernameError('UNALLOWED_CHARS');
      }
      setValidUsername(!invalidCheck);
    }
    setUsername(newUsername);
  };

  const onESOUsernameChange = (newEsoUsername) => {
    const invalidCheck = fieldChecker(newEsoUsername);
    if (newEsoUsername.length >= 3) {
      restClient.checkAvailableESOUsername(newEsoUsername)
        .then((res) => {
          if (invalidCheck) {
            setEsoUsernameError('UNALLOWED_CHARS');
          } else if (!res.isValid) {
            setEsoUsernameError('ALREADY_IN_USE');
          }
          setValidESOUsername(res.isValid && !invalidCheck);
        });
    } else {
      if (invalidCheck) {
        setEsoUsernameError('UNALLOWED_CHARS');
      }
      setValidESOUsername(!invalidCheck);
    }

    setEsoUsername(newEsoUsername);
  };

  const onPasswordChange = (passwordValue, isPasswordField) => {
    const invalidCheck = fieldChecker(passwordValue);
    if (isPasswordField) {
      setPassword(passwordValue);
      const samePassword = passwordValue === confirmPassword;
      setValidPassword(samePassword && !invalidCheck);
      if (samePassword) {
        setPasswordError('PASSWORD_MISMATCH');
      } else if (invalidCheck) {
        setPasswordError('UNALLOWED_CHARS');
      }
    } else {
      setConfirmPassword(passwordValue);
      const samePassword = passwordValue === password;
      setValidPassword(samePassword && !invalidCheck);
      if (samePassword) {
        setPasswordError('PASSWORD_MISMATCH');
      } else if (invalidCheck) {
        setPasswordError('UNALLOWED_CHARS');
      }
    }
  };

  const register = (evt) => {
    const form = evt.currentTarget;

    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    restClient.registerUser({
      username: username,
      password: password,
      name: name,
      surname: surname,
      esoUsername: esoUsername
    })
      .then(() => {
        history.push('/login');
      });

    setValidated(true);
    evt.preventDefault();
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-center">
        <Form noValidate validated={validated} onSubmit={register}>
          <Form.Group controlId="newUername">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text"
                          defaultValue={username}
                          isInvalid={!validUsername}
                          onChange={e => onUsernameChange(e.currentTarget.value)}/>
            <Form.Control.Feedback type="invalid">
              {(usernameError === 'ALREADY_IN_USE' && 'Username giá in uso') ||
              (usernameError === 'UNALLOWED_CHARS' && 'Caratteri non consentiti')}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              ODS Raidplanner username
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password"
                          isInvalid={!validPassword}
                          onChange={e => onPasswordChange(e.target.value, true)}/>
            <Form.Control.Feedback type="invalid">
              {(passwordError === 'UNALLOWED_CHARS' && 'Caratteri non consentiti') ||
              (passwordError === 'PASSWORD_MISMATCH' && 'Le password non sono uguali')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control required type="password"
                          onChange={e => onPasswordChange(e.target.value, false)}/>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control required type="text"
                          onChange={e => setName(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
              Campo obbligatorio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="surname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control required type="text"
                          onChange={e => setSurname(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
              Campo obbligatorio
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="esousername">
            <Form.Label>ESO Username</Form.Label>
            <Form.Control required type="text"
                          isInvalid={!validESOUsername}
                          onChange={e => onESOUsernameChange(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
              {(esoUsernameError === 'ALREADY_IN_USE' && 'Username giá in uso') ||
              (esoUsernameError === 'UNALLOWED_CHARS' && 'Caratteri non consentiti')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="success" type="submit"
                  disabled={!validPassword || !validUsername || !validESOUsername}>
            Registrati
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
