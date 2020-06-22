import * as React from 'react';
import { Container, Media, Row, Col } from "react-bootstrap";

export const Header = () => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Media>
                        <img className="ods_raidplanner_header-image" src={require(`../../images/teso.png`)} />
                    </Media>
                </Col>
            </Row>
        </Container>
    );
}
