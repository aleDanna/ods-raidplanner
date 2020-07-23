import { Card, Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { UserCardProps } from '@core/datatypes/UserCardProps';

import styles from './UserCard.scss';

export const UserCard = (user: UserCardProps) => {

  const roleStyle = {
    'Damage Dealer': {
      name: 'DD',
      color: '#e5653c'
    },
    'Tank': {
      name: 'T',
      color: '#377ea7'
    },
    'Healer': {
      name: 'H',
      color: '#bbb586'
    }
  };

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Container>
          <Row className={styles.title}>
            <Col md={9} sm={9} xs={9}>
              {user.esoUsername}
            </Col>
            <Col md={3} sm={3} xs={3}>
                <span className={styles.roleDot} style={{background: roleStyle[user.role].color}}>
                  <strong>{roleStyle[user.role].name}</strong>
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
