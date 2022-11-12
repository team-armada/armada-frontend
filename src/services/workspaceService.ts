import axios from 'axios';

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
  const response = await axios.get(`/service/all`);
  return response.data;
};

// Run a Workspace
export const runWorkspace = async (taskDefinitionArn: string) => {
  const response = await axios.post(`/workspace`, {
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
  const response = await axios.put(`/workspace`, {
    data: {
      taskID: workspaceArn,
      reason,
    },
  });

  return response.data;
};
