import axios from 'axios';
import { ICohort, ICourse, IUser, IUser_Course } from '../utils/types';

// Retrieve All Courses
export const getAllCourses = async (): Promise<{
  courses: (ICourse & {
    cohort: ICohort;
  })[];
  cohorts: ICohort[];
}> => {
  const response = await axios.get(`/course/all`);
  return response.data.result;
};

// Retrieve a Specific Course
export const getAllStudentsForCourse = async (
  id: number
): Promise<{
  course: ICourse;
  students: (IUser_Course & {
    user: IUser;
  })[];
}> => {
  const response = await axios.get(`/course/${id}`);
  return response.data.result;
};

// Create a Course
export const createCourse = async (
  name: string,
  cohortId: number
): Promise<ICourse> => {
  const data = {
    data: {
      name,
      cohortId,
    },
  };
  const response = await axios.post(`/course/create`, data);
  return response.data.result;
};

//Add Cohort Students to Course
export const addCohortToCourse = async (cohortStudents: IUser_Course[]) => {
  const data = {
    data: cohortStudents,
  };
  const response = await axios.post(`/user/addUsersToCourse`, data);
  return response.data.result;
};

// Delete Course
export const deleteCourse = async (courseId: number): Promise<ICourse> => {
  const response = await axios.delete(`/course/${courseId}`);
  return response.data.result;
};

// Update Course
export const updateCourse = async (
  courseId: number,
  name: string
): Promise<ICourse> => {
  const data = {
    data: {
      name,
      courseId,
    },
  };

  const response = await axios.put(`/course/${courseId}`, data);
  return response.data.result;
};

// Add Users to cohort.
export const addUsersToCourse = async (relationshipArray: IUser_Course[]) => {
  const data = {
    data: relationshipArray,
  };

  const response = await axios.post(`/user/addUsersToCourse`, data);
  return response.data.result;
};
