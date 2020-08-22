import { Container, Media, Row } from 'react-bootstrap';
import React from 'react';
import styles from './Error.scss';

export const Error = () => {
  return (
    <>
      <Container fluid="md" className={styles.container}>
        <Row className="justify-content-center">
          <Media>
            <img src={require('../../../assets/images/error.png')} />
          </Media>
        </Row>
      </Container>
    </>
  );
};
