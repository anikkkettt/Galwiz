import axios from 'axios';

// This baseURL can be changed after deployment
// Default is the development server URL
const instance = axios.create({
  baseURL: 'http://localhost:8082/api/v1',
});

export default instance;
