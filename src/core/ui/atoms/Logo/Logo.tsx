import * as React from 'react';

import logoMobile from '@core/assets/images/teso_mobile.png';
import logoFull from '@core/assets/images/teso.png';
import { isMobile } from "react-device-detect";
import {useEffect, useState} from "react";

export const Logo = () => {
  const [image, setImage] = useState(logoFull);

  useEffect(() => {
    setImage(isMobile ? logoMobile : logoFull);
  })
  
  return <img src={image} className={`align-top`} alt="logo" />;
}
