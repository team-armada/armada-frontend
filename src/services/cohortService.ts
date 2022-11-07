import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Retrieve all cohorts
export const getAllCohorts = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/cohort/all`);
  return response.data.result;
};

// Retrieve all courses for a given cohort.
export const getAllCoursesForCohort = async (id: number): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/cohort/${id}`);
  return response.data.result;
};
