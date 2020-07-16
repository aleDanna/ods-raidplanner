import sessionStorageService from '../services/sessionStorageService';
import { UserProps } from '@core/datatypes/UserProps';
import {useEffect} from "react";

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
        window.location.href = '/login';
      }
    })
  }
};
