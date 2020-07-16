import sessionStorageService from './sessionStorageService';
import { UserProps } from '@core/datatypes/UserProps';

export default {
  reload(user?: UserProps) {
    if (user) {
      sessionStorageService.saveOrUpdate('loggedUser', user);
    }
    location.reload();
  }
};
