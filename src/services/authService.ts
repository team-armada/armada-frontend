import axios from 'axios';

//Create a cohort
export const getAuthObject = async () => {
  const response = await axios.get(`/auth/cognito`);
  return response.data.result;
};
