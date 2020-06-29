import * as ReactDOM from 'react-dom';

import Base from './Base';
import sessionStorageService from "@shared/services/sessionStorageService";

const serverRendered = (window.MyApp && window.MyApp.serverRendered) || false;
const appNode = document.getElementById('app');
const renderFunc = serverRendered ? ReactDOM.hydrate : ReactDOM.render;
renderFunc(Base, appNode);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./Base', () => {
      const base = require('./Base').default;
      ReactDOM.unmountComponentAtNode(appNode!);
      ReactDOM.render(base, appNode);
    });
  }

  require('./dev');
}

if (!sessionStorageService.get("loggedUser")) {
  fetch('http://localhost:9000/auth/recoverSession', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
      .then(res =>  {
        if (res.status === 204) {
        }
        else {
          return res.json()
        }
      })
      .then(res => {
        if (res) {
          sessionStorageService.saveOrUpdate("loggedUser", res);
          window.location.reload();
        }
      })
}


declare var __HOT_RELOAD__: boolean;
declare global {
  interface Window {
    MyApp: {
      serverRendered: boolean;
    };
  }
}
