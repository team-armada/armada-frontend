import axios from 'axios';
import { BASE_URL } from '../utils/constants';

interface ICourseUser {
  courseId: number;
  userId: string;
}

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

// Create a Course
export const createCourse = async (
  name: string,
  cohortId: number
): Promise<string[]> => {
  const data = {
    data: {
      name,
      cohortId,
    },
  };
  const response = await axios.post(`${BASE_URL}/course/create`, data);
  return response.data.result;
};

//Add Cohort Students to Course
export const addCohortToCourse = async (
  cohortStudents: ICourseUser[]
): Promise<string[]> => {
  const data = {
    data: cohortStudents,
  };
  const response = await axios.post(`${BASE_URL}/user/addUsersToCourse`, data);
  return response.data.result;
};
