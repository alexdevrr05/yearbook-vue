import axios from 'axios';

const apiDB = axios.create({
  // baseURL: 'http://localhost:4000/api',
  baseURL: 'https://rest-node-mongo-prod.up.railway.app/api',
});

export default apiDB;
