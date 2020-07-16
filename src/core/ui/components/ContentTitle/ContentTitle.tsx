import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './ContentTitle.scss';

interface ContentTitleProps {
  nameTitle: string;
}
export const ContentTitle = ({ nameTitle }: ContentTitleProps) => {
  return (
    <Container className={styles.container} fluid>
      <Row className={styles.title}>
        <Col md={12}>{nameTitle}</Col>
      </Row>
    </Container>
  );
};
