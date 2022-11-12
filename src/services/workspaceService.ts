import axios from 'axios';
import { ICohort, ICourse, IUser, IWorkspace } from '../utils/types';

// Retrieve all workspaces
export const getAllWorkspaces = async (): Promise<
  (IWorkspace & {
    Course: ICourse & {
      cohort: ICohort;
    };
    user: IUser;
  })[]
> => {
  const response = await axios.get(`/api/service/all`);
  return response.data;
};
