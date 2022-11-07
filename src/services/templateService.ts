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
  mountPoints: IMountSettings[];
}

export interface IMountSettings {
  containerPath: string;
  sourceVolume: string;
}

export interface IContainerDefinition {
  containerDefinition: IContainerSettings[];
  family?: string;
  volumes?: IVolumes[];
  template?: string;
}
export interface IVolumes {
  efsVolumeConfiguration: {
    fileSystemId: string;
    rootDirectory: string;
  };
  name: string;
}

export interface IBaseTemplate {
  definition: IContainerDefinition;
  name: string;
}

// Get base templates.
export const getBaseTemplates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/template/base`);
    return response.data.baseTemplates;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Retrieve all templates
export const getWorkspaceTemplates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/template`);
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
    const response = await axios.post(`${BASE_URL}/template`, {
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
    const response = await axios.delete(`${BASE_URL}/template`, {
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
