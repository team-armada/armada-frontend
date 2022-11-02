import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export interface PortSettings {
  containerPort: number;
  hostPort: number;
  protocol: string;
}

export interface ContainerSettings {
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
  containerDefinition: ContainerSettings[];
  family?: string;
  volumes?: IVolumes[];
}

export interface IVolumes {
  efsVolumeConfiguration: {
    fileSystemId: string;
    rootDirectory: string;
  };
  name: string;
}

export const coderServerOnly: IContainerDefinition = {
  containerDefinition: [
    {
      name: 'code-server',
      image: 'jdguillaume/base-code-server-no-auth',
      memory: 512,
      portMappings: [
        {
          containerPort: 8080,
          hostPort: 0,
          protocol: 'tcp',
        },
      ],
      mountPoints: [
        {
          containerPath: '/home/coder',
          sourceVolume: `coder`,
        },
      ],
    },
  ],
};

// Retrieve all services
export const getAllServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Create a service.
export const createStudentService = async (
  studentName: string,
  cohort: string,
  course: string,
  template: string //codeServerOnly or coderServerPG
  //TODO: check if there is a version for this task def, if not, default to 1, else increase by 1
) => {
  try {
    const response = await axios.post(`${BASE_URL}/services`, {
      data: {
        studentName,
        cohort,
        course,
        template
      },
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Delete a service; if task was started, need to update service def to desiredCount 0, stop task (maybe), THEN stop service
export const deleteService = async (service: string) => {
  try {
    // update service
    //stop any running tasks
    const response = await axios.delete(`${BASE_URL}/services`, {
      data: {
        service,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Update Service to Run Task
export const startService = async (service: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/services/start`, {
      data: {
        service,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Update Service to Stop Task
export const stopService = async (service: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/services/stop`, {
      data: {
        service,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
