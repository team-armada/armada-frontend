import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Retrieve all students
export const getAllStudents = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/user/allStudents`);
  return response.data.result;
};

// Retrieve specific user details
export const getSpecificStudent = async (
  username: string
): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/user/${username}`);
  return response.data.result;
};
