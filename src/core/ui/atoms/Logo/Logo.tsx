import * as React from 'react';

import logoMobile from '@core/assets/images/teso_mobile.png';
import logoFull from '@core/assets/images/teso.png';
import { isMobile } from "react-device-detect";

export const Logo = () => {

  return <img src={ isMobile ? logoMobile : logoFull} className={`align-top`} alt="logo" />;
}
