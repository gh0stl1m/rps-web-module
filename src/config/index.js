// Environment variables
export default (function() {
  let API_URL = '';
  switch(process.env.REACT_APP_ENV) {
    case 'production':
      API_URL = 'http://api.uapp.co';
      break;
    case 'develop':
      API_URL = 'http://api.uapp.co';
      break;
    default:
      API_URL = 'http://localhost:8888';
    break;
  }
  return {
    API_URL
  }
})();
