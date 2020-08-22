export const appHost = () => {
  return process.env.NODE_ENV === 'production' ?
    `https://ods-raidplanner.herokuapp.com` :
    `http://localhost:${process.env.PORT || 3001}`;
};

export const restServerHost = () => {
  return process.env.NODE_ENV === 'production' ?
    'https://ods-raidplanner-rest.herokuapp.com' :
    'http://localhost:8080';
};
