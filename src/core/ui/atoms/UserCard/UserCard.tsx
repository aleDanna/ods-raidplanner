import { Card, Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { UserCardProps } from '@core/datatypes/UserCardProps';

import styles from './UserCard.scss';
import { getRoleValue } from '@core/common/dataUtils';

export const UserCard = (user: UserCardProps) => {

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Container>
          <Row className={styles.title}>
            <Col md={9} sm={9} xs={9}>
              {user.esoUsername}
            </Col>
            <Col md={3} sm={3} xs={3}>
                <span className={styles.roleDot} style={{background: getRoleValue(user.role.roleName!).color}}>
                  <strong>{getRoleValue(user.role.roleName!).tag}</strong>
                </span>
            </Col>
          </Row>
          <Row className={styles.info}>
            <span><strong>{user.characterName}</strong></span>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
