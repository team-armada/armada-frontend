import axios from 'axios';

import {
  CreateServiceCommandOutput,
  DeleteServiceCommandOutput,
  UpdateServiceCommandOutput,
} from '@aws-sdk/client-ecs';

import {
  ICohort,
  ICourse,
  IContainerDefinition,
  IUser,
  IWorkspace,
} from '../utils/types';

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
export const getAllServices = async (): Promise<
  | (IWorkspace & {
      user: IUser;
      Course: ICourse & {
        cohort: ICohort;
      };
    })[]
  | undefined
> => {
  try {
    const response = await axios.get(`/service/all`);
    return response.data.result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const describeService = async (
  service: string
): Promise<number | undefined> => {
  try {
    const response = await axios.get(`/service/${service}`);
    return response.data.result.services[0].desiredCount;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Create a service.
export const createStudentService = async (
  studentValues: {
    username: string;
    uuid: string;
  }[],
  cohort: string,
  course: string,
  template: string,
  courseId: number
): Promise<CreateServiceCommandOutput | undefined> => {
  try {
    const response = await axios.post(`/service/create`, {
      data: {
        studentNames: studentValues,
        cohort,
        course,
        template,
        courseId,
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
export const deleteService = async (
  service: string
): Promise<DeleteServiceCommandOutput | undefined> => {
  try {
    // update service
    //stop any running tasks
    const response = await axios.delete(`/service`, {
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
export const startService = async (
  service: string
): Promise<UpdateServiceCommandOutput | undefined> => {
  try {
    const response = await axios.put(`/service/start`, {
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
export const stopService = async (
  service: string
): Promise<UpdateServiceCommandOutput | undefined> => {
  try {
    const response = await axios.put(`/service/stop`, {
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
