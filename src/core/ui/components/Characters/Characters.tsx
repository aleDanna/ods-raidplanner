import sessionStorageService from '@core/services/sessionStorageService';
import { Alert, Button, Col, Container, FormControl, FormLabel, Modal, Row, Table } from 'react-bootstrap';
import React, { useState } from 'react';
import restClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';

import styles from './Characters.scss';
import { getRoleValue } from '@core/common/dataUtils';
import { CharacterRoleProps } from '@core/datatypes/CharacterRoleProps';

export const Characters = ({roles}) => {

  console.log(roles);
  const userData = sessionStorageService.get('loggedUser');
  const characters = userData.characters;
  const EMPTY_ROLE = '---';
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterRole, setNewCharacterRole] = useState(-1);
  const [invalidCharacterAlertShow, setInvalidCharacterAlertShow] = useState(false);
  const [serverErrorAlertShow, setServerErrorAlertShow] = useState(false);

  const onServerError = () => {
    setServerErrorAlertShow(true);
  };

  const EditModalComponent = ({character}) => {

    const [show, setShow] = useState(false);
    const [upgradedName, setUpgradedName] = useState(character.name);
    const [upgradedRole, setUpgradedRole] = useState(character.role.id);

    const modalOptions = {
      show: show
    };

    async function edit() {
      if (upgradedName && upgradedRole !== '') {
        const user = await restClient.updateCharacter({
          id: character.id,
          name: upgradedName,
          role: {id: upgradedRole},
          userId: userData.id},
          onServerError);
        if (user) {
          windowUtils.reload(user);
        }
      }
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>Modifica</Button>
        <Modal {...modalOptions}>
          <Modal.Header>
            <Modal.Title>Modifica personaggio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <FormLabel column md={2}><strong>Nome personaggio: </strong></FormLabel>
                <FormControl
                  defaultValue={character.name}
                  onChange={(evt) => setUpgradedName(evt.target.value)} />
              </Row>
              <Row>
                <FormLabel column md={2}><strong>Ruolo: </strong></FormLabel>
                <FormControl
                  as="select"
                  defaultValue={character.role.id}
                  onChange={(evt) => setUpgradedRole(evt.target.value)} >
                  {roles.map(role => {
                    return <option selected={role.roleName === character.role.roleName}
                                   key={role.id} value={role.id}>{getRoleValue(role.roleName).description}</option>;
                  })}
                </FormControl>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={edit}>
              Conferma
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const DeleteModalComponent = ({character}) => {

    const [show, setShow] = useState(false);

    const modalOptions = {
      show: show
    };

    async function deleteCharacter() {
      if (character.id === sessionStorageService.get('selectedCharacter')) {
        sessionStorageService.remove('selectedCharacter');
      }
      const user = await restClient.deleteCharacter(character.id, onServerError);
      if (user) {
        windowUtils.reload(user);
      }
    }

    return (
      <>
        <Button variant="danger" onClick={() => setShow(true)}>Elimina</Button>
        <Modal {...modalOptions}>
          <Modal.Header>
            <Modal.Title>Elimina personaggio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={6}>
                  <p>Nome personaggio: </p>
                </Col>
                <p><strong>{character.name}</strong></p>
              </Row>
              <Row>
                <Col md={6}>
                  <p>Ruolo: </p>
                </Col>
                <p><strong>{getRoleValue(character.role.roleName).description}</strong></p>
              </Row>
              <Row>
                <span><strong style={{color: 'red'}}>
                  Attenzione, eliminando il personaggio eliminerai tutte le iscrizioni a lui associate. Continuare?
                </strong></span>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteCharacter}>
              Elimina
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  async function saveCharacter() {
    if (newCharacterName && newCharacterRole !== -1) {
      const user = await restClient.saveCharacter({
        name: newCharacterName,
        role: {
          id: newCharacterRole
        },
        userId: userData.id
      }, onServerError);
      if (user) {
        windowUtils.reload(user);
      }
    } else {
      setInvalidCharacterAlertShow(true);
    }
  }

  return (
    <Container className={styles.container}>
      <Alert variant="danger" show={serverErrorAlertShow}>
        Si é verificato un errore durante la modifica...
      </Alert>
      <Alert variant="danger" show={invalidCharacterAlertShow}>
        Dati mancanti
      </Alert>
      <Row className="justify-content-center">
        <Table responsive striped bordered hover size="sm">
          <thead>
          <tr>
            <th className={styles.characterCell}>Nome personaggio</th>
            <th className={styles.characterCell}>Ruolo</th>
            <th className={styles.characterCell}>Modifica</th>
          </tr>
          </thead>
          <tbody>
          {characters.map(character => {
            return (<tr key={character.id}>
              <td className={styles.characterCell}>
                <p>{character.name}</p>
              </td>
              <td className={styles.characterCell}>
                <p>{getRoleValue(character.role.roleName).description}</p>
              </td>
              <td className={styles.characterCell}>
                <EditModalComponent character={character} />
                <DeleteModalComponent character={character} />
              </td>
            </tr>);
          })}
          <tr>
            <td className={styles.characterCell}>
              <FormControl required value={newCharacterName}
                           onChange={(evt) => setNewCharacterName(evt.target.value)} />
            </td>
            <td className={styles.characterCell}>
              <FormControl
                as="select"
                defaultValue={-1}
                onChange={(evt) => setNewCharacterRole(Number(evt.target.value))} >
                <option selected>{EMPTY_ROLE}</option>
                {roles.map((role: CharacterRoleProps) => {
                  return <option key={role.id} value={role.id}>{getRoleValue(role.roleName!).description}</option>;
                })}
              </FormControl>
            </td>
            <td className={styles.characterCell}>
              <Button variant="success" onClick={saveCharacter}>Aggiungi</Button>
            </td>
          </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );

};
