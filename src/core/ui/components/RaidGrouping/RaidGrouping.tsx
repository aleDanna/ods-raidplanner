import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

import { calculateSubscriptions } from '@core/common/dataUtils';
import { UserCard } from '@core/ui/atoms/UserCard/UserCard';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import restClient from '@core/services/restClient';

import styles from './RaidGrouping.scss';

export const RaidGrouping = ({subscriptions, history}) => {

  const [groups, setGroups] = useState<Array<Array<any>>>([]);
  const [itemsReady, setItemsReady] = useState(false);
  const [showFullRoleAlert, setShowFullRoleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const numOfGroups = calculateSubscriptions(subscriptions.length).groups;

  useEffect(() => {
    const sortFunction = (x, y) => x.roleName.localeCompare(y.roleName);
    if (!itemsReady) {

      for (let i = 0; i <= numOfGroups; i++) {
        groups[i] = subscriptions.filter((item) => {
          return item.groupNumber === i;
        }).sort(sortFunction);
        setGroups(groups);
      }
      setItemsReady(true);
    }
  });

  const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'floralwhite',
    borderRadius: 5,
    minWidth: 230,
    width: 230
  });

  const getGroupLists = () => {
    const fragments = new Array<any>();
    // tslint:disable-next-line:forin
    for (const i in groups) {
      const title = i === '0' ? 'Iscritti' : `Gruppo ${i}`;
      fragments.push(
        <Col md={'auto'}>
          <Droppable droppableId={i}>
            {(provided, snapshot) => (
              <>
                <Row className="justify-content-center"
                     ref={provided.innerRef}
                     style={getListStyle(snapshot.isDraggingOver)}
                     {...provided.droppableProps}
                >
                  <p className={styles.listTitle}><strong>{title}</strong></p>
                  {groups[i].map((user, index) => (
                    <Draggable
                      key={user.esoUsername}
                      draggableId={user.esoUsername}
                      index={index}
                    >
                      {(elemProvided) => (
                        <div>
                          <div
                            ref={elemProvided.innerRef}
                            {...elemProvided.dragHandleProps}
                            {...elemProvided.draggableProps}
                            style={getItemStyle(
                              elemProvided.draggableProps.style
                            )}>
                            <UserCard
                              esoUsername={user.esoUsername}
                              characterName={user.characterName}
                              role={user.roleName} />
                          </div>
                          {elemProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Row>
              </>
            )}
          </Droppable>
        </Col>);
    }
    return fragments.reduce((result, current) => {
      return (
        <>
          {result}
          {current}
        </>
      );
    }, <></>);
  };

  const handleDragEnd = (result) => {

    const reorder =  (groupId, startIndex, endIndex) => {
      const list = Array.from(groups[groupId]);
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);

      groups[groupId] = list;
      setGroups(groups);
      return list;
    };

    const isMovable = (user, group, destGroupNumber) => {
      if (destGroupNumber !== '0') {
        const role = user.roleName;
        let maxRolesInGroup = 2;
        if (role === 'Damage Dealer') {
          maxRolesInGroup = 8;
        }
        return group.filter(item => item.roleName === role).length < maxRolesInGroup && group.length < 12;
      }
      return true;
    };

    const move = (groupSource, groupDestination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(groupSource);
      const destClone = Array.from(groupDestination);
      const movingUser = sourceClone[droppableSource.index];
      if (isMovable(movingUser, destClone, droppableDestination.droppableId)) {
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);

        groups[droppableSource.droppableId] = sourceClone;
        groups[droppableDestination.droppableId] = destClone;

        setGroups(groups);
        setShowFullRoleAlert(false);
      } else {
        setAlertMessage(destClone.length === 12 ?
          'Massimo numero utenti raggiunti per il gruppo!' :
          'Non ci sono piú posizioni disponibili per questo ruolo!');
        setShowFullRoleAlert(true);
      }
    };

    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      reorder(
        source.droppableId,
        source.index,
        destination.index
      );

    } else {
      move(
        groups[source.droppableId],
        groups[destination.droppableId],
        source,
        destination
      );
    }
  };

  const saveGrouping = () => {
    restClient.saveRaidGrouping(groups).then(() => history.goBack());
  };

  return (
    <Container className={styles.container}>
      <Alert variant="danger" show={showFullRoleAlert}>
        {alertMessage}
      </Alert>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className="justify-content-center">
          {itemsReady && getGroupLists()}
        </Row>
      </DragDropContext>
      <Row className={`${styles.button} justify-content-center`}>
        <Button variant="success" onClick={saveGrouping}>Conferma gruppi</Button>
      </Row>
    </Container>
  );
};
