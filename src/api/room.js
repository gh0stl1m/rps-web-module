// External libraries
import axios from 'axios';

// Config
import config from '../config';

export default {
  create: () => axios.post(`${config.API_URL}/room`)
    .then(res => res.data),
  readById: (roomId, select) => axios.get(`${config.API_URL}/room/${roomId}?select=${select}`)
    .then(res => res.data),
};
