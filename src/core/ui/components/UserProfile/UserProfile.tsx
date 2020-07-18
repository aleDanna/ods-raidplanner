import * as React from 'react';
import { Button, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import sessionStorageService from '@core/services/sessionStorageService';
import { useState } from 'react';
import restClient from '@core/services/restClient';

import styles from './UserProfile.scss';
import windowUtils from '@core/common/windowUtils';
import { fieldChecker } from '@core/common/dataUtils';

export const UserProfile = ({history}) => {

  const [editMode, setEditMode] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [validESOUsername, setValidESOUsername] = useState(true);

  const [usernameError, setUsernameError] = useState('');
  const [esoUsernameError, setEsoUsernameError] = useState('');

  const userData = sessionStorageService.get('loggedUser');
  const userDataForm: any = {};

  for (const key in userData)
    userDataForm[key] = userData[key];

  const onUsernameChange = (username) => {
    const invalidCheck = fieldChecker(username);
    if (username.length >= 3) {
      restClient.checkAvailableUsername(username)
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
    setForm('username', username);
  };

  const onESOUsernameChange = (esoUsername) => {
    const invalidCheck = fieldChecker(esoUsername);
    if (esoUsername.length >= 3) {
      restClient.checkAvailableESOUsername(esoUsername)
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

    setForm('esousername', esoUsername);
  };

  const save = (evt) => {
    const form = evt.currentTarget;

    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    restClient.updateUserDetails(userDataForm)
      .then((user) => {
        windowUtils.reload(user);
      });

    setValidated(true);
    evt.preventDefault();
  };

  const setForm = (field, value) => {
    userDataForm[field] = value;
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Jumbotron className={styles.jumbotron}>
          <Form noValidate validated={validated} onSubmit={save}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" defaultValue={userDataForm.username}
                            readOnly={!editMode}
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
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control required type="text" defaultValue={userDataForm.name}
                            readOnly={!editMode}
                            onChange={e => setForm('name', e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Campo obbligatorio
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="surname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control required type="text" defaultValue={userDataForm.surname}
                            readOnly={!editMode}
                            onChange={e => setForm('surname', e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Campo obbligatorio
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="esousername">
              <Form.Label>ESO Username</Form.Label>
              <Form.Control required type="text" defaultValue={userDataForm.esousername}
                            readOnly={!editMode}
                            isInvalid={!validESOUsername}
                            onChange={e => onESOUsernameChange(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                {(esoUsernameError === 'ALREADY_IN_USE' && 'Username giá in uso') ||
                (esoUsernameError === 'UNALLOWED_CHARS' && 'Caratteri non consentiti')}
              </Form.Control.Feedback>
            </Form.Group>
            {!editMode &&
            <Button variant="primary" onClick={() => setEditMode(true)}>
              Modifica
            </Button>
            }
            {editMode &&
            <>
              <Button variant="success" type="submit">
                Conferma
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Annulla
              </Button>
            </>
            }
          </Form>
        </Jumbotron>
      </Row>
    </Container>
  );
};
