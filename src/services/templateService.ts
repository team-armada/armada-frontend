import {
  DeregisterTaskDefinitionCommandOutput,
  ListTaskDefinitionsCommandOutput,
  RegisterTaskDefinitionCommandOutput,
} from '@aws-sdk/client-ecs';
import axios from 'axios';
import { IBaseTemplate, IContainerSettings } from '../utils/types';

// Get base templates.
export const getBaseTemplates = async (): Promise<
  IBaseTemplate[] | undefined
> => {
  try {
    const response = await axios.get(`/api/template/base`);
    return response.data.baseTemplates;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// Retrieve all templates
export const getWorkspaceTemplates = async (): Promise<
  ListTaskDefinitionsCommandOutput | undefined
> => {
  try {
    const response = await axios.get(`/api/template`);
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
): Promise<RegisterTaskDefinitionCommandOutput | undefined> => {
  try {
    const response = await axios.post(`/api/template`, {
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
export const deleteWorkspaceTemplate = async (
  taskDefinitionArn: string
): Promise<DeregisterTaskDefinitionCommandOutput | undefined> => {
  try {
    const response = await axios.delete(`/api/template`, {
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
