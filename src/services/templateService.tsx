import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export interface PortSettings {
  containerPort: number;
  hostPort: number;
  protocol: string;
}

export interface IContainerSettings {
  name: string;
  image: string;
  memory: number;
  portMappings: PortSettings[];
}

// Retrieve all templates
export const getWorkspaceTemplates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/templates`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Create a template.
export const createWorkspaceTemplate = async (
  containerDefinition: IContainerSettings[],
  family: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/templates`, {
      data: {
        containerDefinition,
        family,
      },
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Delete a template
export const deleteWorkspaceTemplate = async (taskDefinitionArn: string) => {
  try {
    console.log(typeof taskDefinitionArn);
    const response = await axios.delete(`${BASE_URL}/templates`, {
      data: {
        taskDefinitionArn,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
