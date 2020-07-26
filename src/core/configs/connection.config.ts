const prodConnection = {
  host: 'ec2-54-75-244-161.eu-west-1.compute.amazonaws.com',
  port: '5432',
  database: 'datgt9ml9uieg6',
  user: 'pfvhyjwvuoiewb',
  password: '82dd150b4b94a80d675d354e420d8bc101675f846e789bdc140c74e0930a2031'
};

const localConnection = {
  host: 'localhost',
  port: '5432',
  database: 'ODS_RAIDPLANNER',
  user: 'postgres',
  password: 'postgres'
};

export const getDbConnection = () => {
  return process.env.NODE_ENV === 'production' ? prodConnection : localConnection;
};

export const appHost = () => {
  return process.env.NODE_ENV === 'production' ?
    `https://ods-raidplanner.herokuapp.com` :
    `http://localhost:${process.env.PORT || 3001}`;
};

export const restServerHost = () => {
  return process.env.NODE_ENV === 'production' ?
    'https://ods-raidplanner-rest.herokuapp.com' :
    'http://localhost:9000';
};
