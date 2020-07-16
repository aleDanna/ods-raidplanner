import { UserProps } from '@core/datatypes/UserProps';

export default {
  setUserSession: (req, user: UserProps) => {
    console.log('saving new session...');
    req.session.user = user;
    req.session.save();
  },
  destroySession: req => {
    req.session.destroy();
  },
  loadUserSession: (req): UserProps => {
    console.log('fetching user session...', req.session);
    return req.session.user;
  }
};
