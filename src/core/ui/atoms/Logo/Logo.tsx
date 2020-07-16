import * as React from 'react';

import image from '@core/assets/images/teso.png';

import styles from './Logo.scss';
import {isMobile} from "react-device-detect";
import { useEffect, useState} from "react";

export const Logo = () => {

  const [style, setStyle] = useState({
    width: '400px',
    height: '60px'
  });

  useEffect(() => {
    const loadStyle = async () => {
      setStyle({
        width: isMobile ? '220px' : '400px',
        height: isMobile ? '80px' : '60px'
      })
    };
    loadStyle();
  }, []);

  return <img src={image} style={style} className={`${styles.logo} align-top`} alt="logo" />;
}
