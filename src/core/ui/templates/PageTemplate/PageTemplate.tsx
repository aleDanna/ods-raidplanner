import * as React from 'react';
import styles from './PageTemplate.scss';
import { NavBar } from '@core/ui/atoms/NavBar/NavBar';
import {Container} from "react-bootstrap";

interface Props {
  children: React.ReactNode;
}

export function PageTemplate({ children }: Props) {
  return (
    <>
    <div className={styles.pageTemplate}>
      <NavBar />
      <Container>
          {children}
      </Container>
    </div>
  </>
);
}
