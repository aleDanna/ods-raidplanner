import * as ReactDOM from 'react-dom';

import App from './App';
import sessionStorageService from "@shared/services/sessionStorageService";
import windowUtils from "../utils/windowUtils";

const serverRendered = (window.MyApp && window.MyApp.serverRendered) || false;
const appNode = document.getElementById('app');
const renderFunc = serverRendered ? ReactDOM.hydrate : ReactDOM.render;
renderFunc(App, appNode);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      const base = require('./App').default;
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
            windowUtils.reload();
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
