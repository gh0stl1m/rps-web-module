// External libraries
import axios from 'axios';

// Config
import config from '../config';

export default {
  create: () => axios.post(`${config.API_URL}/room`)
    .then(res => res.data),
};
