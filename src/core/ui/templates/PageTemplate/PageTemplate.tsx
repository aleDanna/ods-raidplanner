import * as React from 'react';
import styles from './PageTemplate.scss';
import { NavBar } from '@core/ui/components/NavBar/NavBar';

interface Props {
  children: React.ReactNode;
}

export function PageTemplate({ children }: Props) {
  return (
    <div className={styles.pageTemplate}>
      <NavBar />
      {children}
    </div>
  );
}
