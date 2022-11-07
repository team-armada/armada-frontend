import axios from 'axios';
import { BASE_URL } from '../utils/constants';

interface IStudent {
  uuid: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}
// Retrieve all students
export const getAllStudents = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/user/allStudents`);
  return response.data.result;
};

// Retrieve specific user details
export const getSpecificStudent = async (
  username: string
): Promise<IStudent> => {
  const response = await axios.get(`${BASE_URL}/user/${username}`);
  return response.data.result.user;
};
