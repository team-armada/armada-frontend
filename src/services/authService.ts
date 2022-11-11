import axios from 'axios';
import { BASE_URL } from '../utils/constants';

//Create a cohort
export const getAuthObject = async () => {
  const response = await axios.get(`${BASE_URL}/auth/cognito`);
  return response.data.result;
};
