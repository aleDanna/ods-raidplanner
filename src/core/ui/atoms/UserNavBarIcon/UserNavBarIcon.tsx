import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './UserNavBarIcon.scss';

export const UserNavBarIcon = ({ username }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 16 16"
            className="bi bi-person-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </Col>
        {}
        <Col md={4} className={styles.navbarUserUsername}>
          {username}
        </Col>
      </Row>
    </Container>
  );
};
