import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default apiRequest
