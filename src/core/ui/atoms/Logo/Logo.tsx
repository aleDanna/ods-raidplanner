import * as React from 'react';

import image from '@core/assets/images/teso.png';

import styles from './Logo.scss';

export function Logo() {
  return <img src={image} className={`${styles.logo} d-inline-block align-top`} alt="logo" />;
}
