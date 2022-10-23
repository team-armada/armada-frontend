import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Retrieve all templates
export const getTemplates = async () => {
  const response = await axios.get(`baseUrl/templates`);
  return response.data;
};

// Create a template.
const createWorkspaceTemplate = () => {};

// Delete a template
const deleteWorkspaceTemplate = () => {};
