import sessionStorageService from '../services/sessionStorageService';
import { UserProps } from '@core/datatypes/UserProps';
import { useEffect } from 'react';
import restClient from '@core/services/restClient';

export default {
  reload: (user?: UserProps) => {
    if (user) {
      sessionStorageService.saveOrUpdate('loggedUser', user);
    }
    location.reload();
  },

  checkAuthenticated: () => {
    useEffect(() => {
      if (!sessionStorageService.get('loggedUser')) {
        restClient.recoverSession()
          .then(res => {
            if (res.status === 204) {
              window.location.href = '/login';
            } else {
              sessionStorageService.saveOrUpdate('loggedUser', res);
              location.reload();
            }
          });
      }
    });
  },
  scrollTop() {
    window.scrollTo(0, 0);
  },
  goToHome(user?: UserProps) {
    if (user) {
      sessionStorageService.saveOrUpdate('loggedUser', user);
    }
    window.location.href = '/';
  }
};
