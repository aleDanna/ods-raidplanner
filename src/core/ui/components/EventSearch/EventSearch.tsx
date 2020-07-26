import { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import * as React from 'react';
import restClient from '@core/services/restClient';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import { RaidCard } from '@core/ui/atoms/RaidCard/RaidCard';
import { EmptyRaid, RaidProps } from '@core/datatypes/RaidProps';

import styles from './EventSearch.scss';
import { getGroupValue } from '@core/common/dataUtils';

export const EventSearch = ({history, groups}) => {

  const [eventToDelete, setEventToDelete] = useState(EmptyRaid);
  const DeleteEventModal = ({show}) => {

    const modalProps = {
      show: show
    };

    const deleteEvent = () => {
      restClient.deleteEvent(eventToDelete.id!)
        .then((res) => {
          if (res.status === 200) {
            setShowDeleteModal(false);
            searchEvents();
          }
        });
    };

    return (
      <Modal {...modalProps} >
        <Modal.Header>
          <Modal.Title>Elimina evento {
            getGroupValue(eventToDelete.raidGroup.name!).description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l'evento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteEvent}>
            Elimina evento
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const EMPTY_GROUP = '---';

  const [showResult, setShowResult] = useState(false);
  const [raids, setRaids] = useState<Array<RaidProps>>([]);

  const [groupFilter, setGroupFilter] = useState(EMPTY_GROUP);
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function searchEvents() {
    const result = await restClient.getRaidsByFilter({
      startDateFilter: startDateFilter ? new Date(startDateFilter) : undefined,
      endDateFilter: endDateFilter ? new Date(endDateFilter) : undefined,
      groupFilter: groupFilter && groupFilter !== EMPTY_GROUP ? groupFilter : undefined
    });
    setRaids(result);
    setShowResult(true);
  }

  const eventDetails = (eventId) => {
    history.push(`/raid/${eventId}`);
  };

  const onDeleteHandler = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  return (
    <>
      <DeleteEventModal show={showDeleteModal}/>
      <Container className={styles.container}>
        <Form noValidate>
          <Form.Row>
            <Form.Group as={Col} controlId="startDateFilterSearchEvent">
              <Form.Label>Data inizio: </Form.Label>
              <Form.Control required type="date" value={startDateFilter}
                            onChange={e => setStartDateFilter(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="endDateFilterSearchEvent">
              <Form.Label>Data fine: </Form.Label>
              <Form.Control required type="date" value={endDateFilter}
                            onChange={e => setEndDateFilter(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="raidGroupFilterSearchEvent">
              <Form.Label>Evento: </Form.Label>
              <Form.Control required as="select" value={groupFilter}
                            onChange={e => setGroupFilter(e.target.value)}>
                {groups.map(group => {
                  return <option key={group.id} value={group.id}>{group.name}</option>;
                })}
                <option selected >{EMPTY_GROUP}</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Button variant="primary" onClick={searchEvents}>
            Cerca eventi
          </Button>
        </Form>
      </Container>

      {showResult &&
      <>
        <ContentTitle nameTitle={raids.length === 0 ? 'Nessun evento trovato' : 'Eventi'} />
        <Container fluid="md" className={styles.container}>
          <Row>
            {raids.map((item: RaidProps) => {
              return (
                <Col key={item.id} md="auto" xs={6} className={styles.resultEvent}>
                  <RaidCard event={item} />
                  <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                    Dettagli
                  </Button>
                  <Button variant="danger" size="sm" block onClick={() => onDeleteHandler(item)}>
                    Elimina
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
      }
    </>
  );

};
