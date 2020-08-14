import { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Table
} from 'react-bootstrap';
import * as React from 'react';
import restClient from '@core/services/restClient';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';

import styles from './EditUser.scss';

export const EditUser = ({roles}) => {

  const [showResult, setShowResult] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<any>(null);
  const [rankValid, setRankValid] = useState(true);
  const [roleValid, setRoleValid] = useState(true);

  const ConfirmModal = ({show}) => {

    const modalOptions = {
      show: show
    };

    return (
      <>
        <Modal {...modalOptions}>
          <Modal.Header>
            <Modal.Title>Modifica utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              Utente modificato correttamente
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => {
              setShowSuccessModal(false);
              setShowResult(false);
              setUsername('');
            }}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  async function searchUser() {
    if (user) {
      setShowResult(false);
      setUser(null);
    }
    const result = await restClient.findUser(username, (status) => {
      if (status === 404) {
        setShowNotFoundAlert(true);
      }
    });
    if (result) {
      setUser(result);
      setShowResult(true);
      setShowNotFoundAlert(false);
    }
  }

  const onRankChange = (rank) => {
    if (rank < 1) {
      setRankValid(false);
    } else {
      user.rank = rank;
      setRankValid(true);
    }
  };

  const onRoleChange = (role) => {
    if (roles.indexOf(role) <= -1) {
      setRoleValid(false);
    } else {
      user.credential.role = role;
      setUser(user);
    }
  };

  async function update() {
    const userUpdate = await restClient.updateUser(user);
    if (userUpdate) {
      setShowSuccessModal(true);
    }
  }

  return (
    <>
      <Alert variant="warning" show={showNotFoundAlert}>
        Utente non trovato
      </Alert>
      <ConfirmModal show={showSuccessModal} />
      <Container className={styles.container}>
        <Row>
          <InputGroup>
            <FormControl
              placeholder="ODS username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}/>
            <InputGroup.Append>
              <Button onClick={searchUser}>Cerca utente</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Container>

      {showResult &&
      <>
        <ContentTitle nameTitle="Risultato" />
        <Container fluid="md" className={styles.container}>
          <Row className="justify-content-center">
            {user.id ?
              <Table responsive striped bordered hover size="sm">
                <thead>
                <tr>
                  <th className={styles.userCell}>Username</th>
                  <th className={styles.userCell}>Nome</th>
                  <th className={styles.userCell}>Cognome</th>
                  <th className={styles.userCell}>Rank</th>
                  <th className={styles.userCell}>Role</th>
                  <th className={styles.userCell}>Modifica</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className={styles.userCell}>
                    <p>{user.username}</p>
                  </td>
                  <td className={styles.userCell}>
                    <p>{user.name}</p>
                  </td>
                  <td className={styles.userCell}>
                    <p>{user.surname}</p>
                  </td>
                  <td className={styles.userCell}>
                    <FormControl type="number" size="sm"
                                 defaultValue={user.rank}
                                 onChange={(evt) => onRankChange(evt.target.value)}
                                 isInvalid={!rankValid}/>
                  </td>
                  <td className={styles.userCell}>
                    <FormControl as="select"
                                 defaultValue={user.credential.role}
                                 isInvalid={!roleValid}
                                 onChange={(evt) => onRoleChange(evt.target.value)}>
                      {roles.map(role => {
                        return <option key={role} value={role}>{role}</option>;
                      })}
                    </FormControl>
                  </td>
                  <td className={styles.userCell}>
                    <Button variant="success" onClick={update}>Modifica</Button>
                  </td>
                </tr>
                </tbody>
              </Table>
              :
              <Alert variant="danger">
                Nessun utente trovato
              </Alert>
            }
          </Row>
        </Container>
      </>
      }
    </>
  );

};
