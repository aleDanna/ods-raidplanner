import * as React from 'react';
import {Container, Row, Col, Spinner} from "react-bootstrap";

export const Loading = () => {
    return (
        <Container className="ods_raidplanner_loading-container">
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <Spinner className="ods_raidplanner_loading-spinner" animation="border" />
                </Col>
            </Row>
        </Container>
    );
}
