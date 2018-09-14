// External libraries
import axios from 'axios';

// Config
import config from '../config';

export default {
  create: (username) => axios.post(`${config.API_URL}/user`, { username })
    .then(res => res.data),
  readById: (userId, select) => axios.get(`${config.API_URL}/user/${userId}?select=${select}`)
    .then(res => res.data),
};
