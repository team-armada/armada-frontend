import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export interface IStudent {
  user: {
    uuid: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    user_cohort?: IUser_Cohort[];
    user_course?: IUser_Course[];
  };
}

export interface IUser_Cohort {
  userId: string;
  cohortId: number;
}

export interface IUser_Course {
  userId: string;
  courseId: number;
}

export interface ICohort {
  id: number;
  name: string;
}

export interface ICourses {
  id: number;
  name: string;
  cohortId: number;
}

export interface ISpecificStudent {
  user: IStudent['user'];
  cohorts: ICohort[];
  courses: ICourses[];
}

// Retrieve all students
export const getAllStudents = async (): Promise<IStudent[]> => {
  const response = await axios.get(`${BASE_URL}/user/allStudents`);
  return response.data.result;
};

// Retrieve specific user details
export const getSpecificStudent = async (
  username: string
): Promise<ISpecificStudent> => {
  const response = await axios.get(`${BASE_URL}/user/${username}`);
  return response.data.result;
};

// Retrieve specific user details
export const getStudentsNotInCohort = async (
  cohortId: number
): Promise<ISpecificStudent> => {
  const response = await axios.get(
    `${BASE_URL}/user/allStudentsNotInCohort/${cohortId}`
  );

  return response.data.result;
};

// Retrieve specific user details
export const getStudentsInCohortNotInCourse = async (
  cohortId: number,
  courseId: number
) => {
  const response = await axios.get(
    `${BASE_URL}/user/allStudentsNotInCourse/${cohortId}/${courseId}`
  );

  return response.data.result;
};

// Create a user
export const createStudent = async (
  username: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const data = {
    data: {
      username,
      firstName,
      lastName,
      email,
      userType: 'student',
    },
  };

  const response = await axios.post(`${BASE_URL}/user/create`, data);
  return response.data.result;
};

// Get all students who don't have a workspace for a given course.
// '/allStudentsWithoutWorkspaces/:courseId';

export const getCourseStudentsWithoutWorkspaces = async (
  courseId: number
): Promise<ISpecificStudent> => {
  const response = await axios.get(
    `${BASE_URL}/user/allStudentsWithoutWorkspaces/${courseId}`
  );

  return response.data.result;
};

//Delete a user
export const deleteStudent = async (uuid: number) => {
  const response = await axios.delete(`${BASE_URL}/user/delete/${uuid}`);
  return response.data.result;
};
