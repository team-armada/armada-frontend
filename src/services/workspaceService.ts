import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export interface IResponse {
  message: string;
  result: {
    $metadata: {
      httpStatusCode: number;
      requestId: string;
      attempts: number;
      totalRetryDelay: number;
    };
    taskArns: string[];
  };
}

// Retrieve all workspaces
export const getAllWorkspaces = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/service/all`);
  return response.data;
};

// Run a Workspace
export const runWorkspace = async (taskDefinitionArn: string) => {
  const response = await axios.post(`${BASE_URL}/workspace`, {
    data: {
      taskDefinitionArn,
    },
  });
  return response.data;
};

// Stop a Workspace
export const stopWorkspace = async (
  workspaceArn: string,
  reason: string = 'SESSION_ENDED'
) => {
  const response = await axios.put(`${BASE_URL}/workspace`, {
    data: {
      taskID: workspaceArn,
      reason,
    },
  });

  return response.data;
};
