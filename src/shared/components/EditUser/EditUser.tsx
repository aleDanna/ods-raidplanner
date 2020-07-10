import {useState} from "react";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormLabel,
    InputGroup,
    Modal,
    Row,
    Table
} from "react-bootstrap";
import * as React from "react";
import restClient from "@shared/services/restClient";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import windowUtils from "../../../utils/windowUtils";

export const EditUser = ({roles}) => {

    const [showResult, setShowResult] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [username, setUsername] = useState("");
    const [user, setUser] = useState<any>(null);
    const [rankValid, setRankValid] = useState(true);
    const [roleValid, setRoleValid] = useState(true);

    const ConfirmModal = ({show}) => {

        const modalOptions = {
            show: show
        }

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
                        <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                            Chiudi
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


    const searchUser = () => {
        restClient.findUser(username)
            .then ((data) => {
                setUser(data);
                setShowResult(true);
            })
    }

    const onRankChange = (rank) => {
        if(rank < 1) {
            setRankValid(false);
        }
        else {
            user.rank = rank;
            setRankValid(true);
        }
    }

    const onRoleChange = (role) => {
        if(roles.indexOf(role) <= -1) {
            setRoleValid(false);
        }
        else {
            user.role = role;
        }
    }

    const update = () => {
        restClient.updateUser(user)
            .then((res) => {
                if (res.status === 200) {
                    setShowSuccessModal(true);
                }
            })
    }

    return (
        <>
            <ConfirmModal show={showSuccessModal} />
            <Container className="ods_raidplanner_edit-user-search-container">
                <Row>
                    <InputGroup>
                        <FormControl
                            placeholder="ODS username"
                            required
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
                <Container fluid="md" className="ods_raidplanner_edit-user-container">
                    <Row className="justify-content-md-center">
                        {user.id ?
                            <Table responsive striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th className="ods_raidplanner_edit-user-cell">Username</th>
                                    <th className="ods_raidplanner_edit-user-cell">Nome</th>
                                    <th className="ods_raidplanner_edit-user-cell">Cognome</th>
                                    <th className="ods_raidplanner_edit-user-cell">Rank</th>
                                    <th className="ods_raidplanner_edit-user-cell">Role</th>
                                    <th className="ods_raidplanner_edit-user-cell">Modifica</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="ods_raidplanner_edit-user-cell">
                                        <p>{user.username}</p>
                                    </td>
                                    <td className="ods_raidplanner_edit-user-cell">
                                        <p>{user.name}</p>
                                    </td>
                                    <td className="ods_raidplanner_edit-user-cell">
                                        <p>{user.surname}</p>
                                    </td>
                                    <td className="ods_raidplanner_edit-user-cell">
                                        <FormControl type="number" size="sm"
                                                     defaultValue={user.rank}
                                                     onChange={(evt) => onRankChange(evt.target.value)}
                                                     isInvalid={!rankValid}/>
                                    </td>
                                    <td className="ods_raidplanner_edit-user-cell">
                                        <FormControl as="select"
                                                     defaultValue={user.role}
                                                     isInvalid={!roleValid}
                                                     onChange={(evt) => onRoleChange(evt.target.value)}>
                                            {roles.map(role => {
                                                return <option value={role}>{role}</option>
                                            })}
                                        </FormControl>
                                    </td>
                                    <td className="ods_raidplanner_edit-user-cell">
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
    )

}
