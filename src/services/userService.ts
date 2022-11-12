import axios from 'axios';
import {
  ICohort,
  ICourse,
  IUser,
  IUser_Cohort,
  IUser_Course,
  IWorkspace,
} from '../utils/types';

// Retrieve all students
export const getAllStudents = async (): Promise<
  (IUser & {
    user_cohort: (IUser_Cohort & {
      cohort: ICohort;
    })[];
    user_course: (IUser_Course & {
      course: ICourse;
    })[];
  })[]
> => {
  const response = await axios.get(`/user/allStudents`);
  return response.data.result;
};

// Retrieve specific user details
export const getSpecificStudent = async (
  username: string
): Promise<
  | IUser & {
      user_cohort: (IUser_Cohort & {
        cohort: ICohort;
      })[];
      user_course: (IUser_Course & {
        course: ICourse & {
          cohort: ICohort;
        };
      })[];
      workspaces: (IWorkspace & {
        course: ICourse & {
          cohort: ICohort;
        };
      })[];
    }
> => {
  const response = await axios.get(`/user/${username}`);
  return response.data.result;
};

// Retrieve specific user details
export const getStudentsNotInCohort = async (
  cohortId: number
): Promise<IUser[]> => {
  const response = await axios.get(`/user/allStudentsNotInCohort/${cohortId}`);

  return response.data.result;
};

// Retrieve specific user details
export const getStudentsInCohortNotInCourse = async (
  cohortId: number,
  courseId: number
): Promise<IUser[]> => {
  const response = await axios.get(
    `/user/allStudentsNotInCourse/${cohortId}/${courseId}`
  );

  return response.data.result;
};

// Create a user
export const createStudent = async (
  username: string,
  firstName: string,
  lastName: string,
  email: string
): Promise<IUser> => {
  const data = {
    data: {
      username,
      firstName,
      lastName,
      email,
      userType: 'student',
    },
  };

  const response = await axios.post(`/user/create`, data);
  return response.data.result;
};

// Get all students who don't have a workspace for a given course.
// '/allStudentsWithoutWorkspaces/:courseId';

export const getCourseStudentsWithoutWorkspaces = async (
  courseId: number
): Promise<IUser[]> => {
  const response = await axios.get(
    `/user/allStudentsWithoutWorkspaces/${courseId}`
  );

  return response.data.result;
};

//Delete a user
export const deleteStudent = async (uuid: string): Promise<IUser[]> => {
  const response = await axios.delete(`/user/delete/${uuid}`);
  return response.data.result;
};
