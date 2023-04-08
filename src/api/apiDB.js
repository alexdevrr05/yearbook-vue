import axios from 'axios';

const apiDB = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default apiDB;