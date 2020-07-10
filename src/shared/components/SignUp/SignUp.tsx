import * as React from 'react';
import {Button, Container, Form, Jumbotron, Row} from "react-bootstrap";
import sessionStorageService from "@shared/services/sessionStorageService";
import {useState} from "react";
import restClient from "@shared/services/restClient";
import windowUtils from "../../../utils/windowUtils";

export const SignUp = ({history}) => {

    const [validated, setValidated] = useState(false);
    const [validUsername, setValidUsername] = useState(true);
    const [validESOUsername, setValidESOUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [esoUsername, setEsoUsername] = useState("");


    const onUsernameChange = (username) => {
        if (username.length >= 3) {
            restClient.checkAvailableUsername(username)
                .then((res) => {
                    setValidUsername(res.isValid);
                });
        }
        setUsername(username);
    }

    const onESOUsernameChange = (username) => {
        if (username.length >= 3) {
            restClient.checkAvailableESOUsername(username)
                .then((res) => {
                    setValidESOUsername(res.isValid);
                });
        }
        setEsoUsername(username);
    }

    const onPasswordChange = (passwordValue, isPasswordField) => {
        if (isPasswordField) {
            setPassword(passwordValue);
            setValidPassword(passwordValue === confirmPassword);
        }
        else {
            setConfirmPassword(passwordValue);
            setValidPassword(passwordValue === password);
        }
    }

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
                history.push("/rp/login");
            });

        setValidated(true);
        evt.preventDefault();
    }

    return (
        <Container className="ods_raidplanner_signup-container">
            <Row className="justify-content-md-center">
                <Form noValidate validated={validated} onSubmit={register}>
                    <Form.Group controlId="newUername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text"
                                      defaultValue={username}
                                      isInvalid={!validUsername}
                                      onChange={e => onUsernameChange(e.currentTarget.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Username giá in uso
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            ODS Raidplanner username
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password"
                                      onChange={e => onPasswordChange(e.target.value, true)}/>
                        <Form.Control.Feedback type="invalid">
                            Campo obbligatorio
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control required type="password"
                                      isInvalid={!validPassword}
                                      onChange={e => onPasswordChange(e.target.value, false)}/>
                        <Form.Control.Feedback type="invalid">
                            Le password non sono uguali
                        </Form.Control.Feedback>
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
                    <Form.Group controlId="eso_username">
                        <Form.Label>ESO Username</Form.Label>
                        <Form.Control required type="text"
                                      isInvalid={!validESOUsername}
                                      onChange={e => onESOUsernameChange(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Username giá in uso
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit" disabled={!validPassword || !validUsername || !validESOUsername}>
                        Registrati
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}
