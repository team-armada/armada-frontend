import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Retrieve All Courses
export const getAllCourses = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/course/all`);
  return response.data.result;
};

// Retrieve a Specific Course
export const getAllStudentsForCourse = async (
  id: number
): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/course/${id}`);
  return response.data.result;
};
