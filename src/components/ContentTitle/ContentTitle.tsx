import * as React from 'react';
import { Container, Row, Col } from "react-bootstrap";
export const ContentTitle = (props) => {
    const { nameTitle } = props;
    return (
        <Container className="ods_raidplanner_contenttitle-container" fluid>
            <Row className="ods_raidplanner_contenttitle-title">
                <Col md={12}>
                    {nameTitle}
                </Col>
            </Row>
        </Container>
    )
}