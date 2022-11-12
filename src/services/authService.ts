import axios from 'axios';
import { IAuth } from '../utils/types';

//Create a cohort
export const getAuthObject = async (): Promise<IAuth> => {
  const response = await axios.get(`/api/auth/cognito`);
  return response.data.result;
};
