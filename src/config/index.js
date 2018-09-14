// Environment variables
export default (function() {
  let API_URL = '';
  let SOCKET_URL = '';
  let WEB_URL = ''
  switch(process.env.REACT_APP_ENV) {
    case 'production':
      API_URL = 'http://api-app.co';
      SOCKET_URL = 'http://wss-app.co';
      WEB_URL = 'http://app.co';
      break;
    case 'develop':
      API_URL = 'http://api-app.com';
      SOCKET_URL = 'http://wss-app.com';
      WEB_URL = 'http://app.co';
      break;
    default:
      API_URL = 'http://localhost:41000';
      SOCKET_URL = 'http://localhost:42050';
      WEB_URL = 'http://localhost:3000';
    break;
  }
  return {
    API_URL,
    SOCKET_URL,
    WEB_URL,
  }
})();
