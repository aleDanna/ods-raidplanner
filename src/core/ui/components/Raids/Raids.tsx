import * as React from 'react';
import { RaidsGrid } from '../RaidsGrid/RaidsGrid';
import { Container } from 'react-bootstrap';
import { RaidCalendar } from '../RaidsCalendar/RaidCalendar';
import { isMobile } from 'react-device-detect';

export const Raids = ({ mode, raids, history }) => {
  let content = <RaidsGrid events={raids} history={history} />;

  if (mode === 'calendar' && !isMobile) {
    content = <RaidCalendar events={raids} history={history} />;
  }

  return <Container fluid>{content}</Container>;
};
