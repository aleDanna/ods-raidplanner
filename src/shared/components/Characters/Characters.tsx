import sessionStorageService from "@shared/services/sessionStorageService";
import {Alert, Button, Col, Container, FormControl, FormLabel, Modal, Row, Table} from "react-bootstrap";
import React, {useState} from "react";
import restClient from "@shared/services/restClient";
import windowUtils from "../../../utils/windowUtils";


export const Characters = ({groups}) => {


    const EditModalComponent = ({character}) => {

        const [show, setShow] = useState(false);
        const [upgradedName, setUpgradedName] = useState(character.character_name);
        const [upgradedRole, setUpgradedRole] = useState(character.role_id);

        const modalOptions = {
            show: show
        }

        const edit = () => {
            if (upgradedName && upgradedRole !== "") {
                restClient.updateCharacter(character.character_id, upgradedName, upgradedRole)
                    .then((user) => {
                        windowUtils.reload(user);
                    })
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
                                    defaultValue={character.character_name}
                                    onChange={(evt) => setUpgradedName(evt.target.value)} />
                            </Row>
                            <Row>
                                <FormLabel column md={2}><strong>Ruolo: </strong></FormLabel>
                                <FormControl
                                    as="select"
                                    defaultValue={character.role_id}
                                    onChange={(evt) => setUpgradedRole(evt.target.value)} >
                                    {groups.map(group => {
                                        return <option value={group['id']}>{group['name']}</option>
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
        )
    }

    const DeleteModalComponent = ({character}) => {

        const [show, setShow] = useState(false);

        const modalOptions = {
            show: show
        }

        const deleteCharacter = () => {
            restClient.deleteCharacter(character.character_id)
                .then((user) => {
                    windowUtils.reload(user);
                })
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
                                <p><strong>{character.character_name}</strong></p>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p>Ruolo: </p>
                                </Col>
                                <p><strong>{character.role_name}</strong></p>
                            </Row>
                            <Row>
                                <span><strong style={{color: 'red'}}>Attenzione, eliminando il personaggio eliminerai tutte le iscrizioni a lui associate. Continuare?</strong></span>
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
        )
    }

    const characters = sessionStorageService.get("loggedUser").characters;
    const EMPTY_ROLE = "---";
    const [newCharacterName, setNewCharacterName] = useState("");
    const [newCharacterRole, setNewCharacterRole] = useState(EMPTY_ROLE);
    const [invalidCharacterAlertShow, setInvalidCharacterAlertShow] = useState(false);

    const saveCharacter = () => {
        if (newCharacterName && newCharacterRole !== EMPTY_ROLE) {
            restClient.saveCharacter(newCharacterName, newCharacterRole)
                .then((user) => {
                    windowUtils.reload(user);
                });
        }
        else {
            setInvalidCharacterAlertShow(true)
        }
    };

    return (
        <Container className="ods_raidplanner_characters-container">
            <Alert variant="danger" show={invalidCharacterAlertShow}>
                Username o password errati
            </Alert>
            <Row className="justify-content-md-center">
                <Table responsive striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th className="ods_raidplanner_characters-cell">Nome personaggio</th>
                        <th className="ods_raidplanner_characters-cell">Ruolo</th>
                        <th className="ods_raidplanner_characters-cell">Modifica</th>
                    </tr>
                    </thead>
                    <tbody>
                    {characters.map(character => {
                        return (<tr>
                            <td className="ods_raidplanner_characters-cell">
                                <p>{character.character_name}</p>
                            </td>
                            <td className="ods_raidplanner_characters-cell">
                                <p>{character.role_name}</p>
                            </td>
                            <td className="ods_raidplanner_characters-cell">
                                <EditModalComponent character={character} />
                                <DeleteModalComponent character={character} />
                            </td>
                        </tr>)
                    })}
                    <tr>
                        <td className="ods_raidplanner_characters-cell">
                            <FormControl required value={newCharacterName}
                                         onChange={(evt) => setNewCharacterName(evt.target.value)} />
                        </td>
                        <td className="ods_raidplanner_characters-cell">
                            <FormControl
                                as="select"
                                defaultValue={EMPTY_ROLE}
                                onChange={(evt) => setNewCharacterRole(evt.target.value)} >
                                {groups.map(group => {
                                    return <option value={group['id']}>{group['name']}</option>
                                })}
                                <option selected>{EMPTY_ROLE}</option>
                            </FormControl>
                        </td>
                        <td className="ods_raidplanner_characters-cell">
                            <Button variant="success" onClick={saveCharacter}>Aggiungi</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    )

}
