import axios from 'axios';

interface ICohortUser {
  userId: string;
  cohortId: number;
}

//Create a cohort
export const createCohort = async (name: string) => {
  const data = {
    data: {
      name,
    },
  };

  const response = await axios.post(`/cohort/create`, data);
  return response.data.result;
};

// Retrieve all cohorts
export const getAllCohorts = async (): Promise<string[]> => {
  const response = await axios.get(`/cohort/all`);
  return response.data.result;
};

// Retrieve all users for a given cohort.
export const getAllStudentsInCohort = async (id: number): Promise<string[]> => {
  const response = await axios.get(`/user/allStudentsInCohort/${id}`);

  return response.data.result;
};

// Retrieve all courses for a given cohort.
export const getAllCoursesForCohort = async (id: number): Promise<string[]> => {
  const response = await axios.get(`/cohort/${id}`);
  return response.data.result;
};

// Add Users to cohort.
export const addUsersToCohort = async (relationshipArray: ICohortUser[]) => {
  const data = {
    data: relationshipArray,
  };

  const response = await axios.post(`/user/addUsersToCohort`, data);
  return response.data.result;
};

// Delete Cohort
export const deleteCohort = async (cohortId: number) => {
  const response = await axios.delete(`/cohort/${cohortId}`);
  return response.data.result;
};

// Update Cohort
export const updateCohort = async (cohortId: number, name: string) => {
  const data = {
    data: {
      name,
      cohortId,
    },
  };

  const response = await axios.put(`/cohort/${cohortId}`, data);
  return response.data.result;
};
