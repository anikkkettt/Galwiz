import axios from 'axios';

// This baseURL can be changed after deployment
// Default is the development server URL
const instance = axios.create({
  baseURL: 'https://galwiz-backend.onrender.com/api/v1',
});

export default instance;
