import * as React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import styles from './Loading.scss';

export const Loading = () => {
  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Spinner className={styles.spinner} animation="border" />
        </Col>
      </Row>
    </Container>
  );
};
