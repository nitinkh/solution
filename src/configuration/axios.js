import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mock-api.dev.lalamove.com'
});

export default instance;
