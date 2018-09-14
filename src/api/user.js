// External libraries
import axios from 'axios';

// Config
import config from '../config';

export default {
  create: (username) => axios.post(`${config.API_URL}/user`, { username })
    .then(res => res.data),
};
