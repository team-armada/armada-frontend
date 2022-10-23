import { useState } from 'react';
import { Form } from 'react-router-dom';
import {
  IContainerDefinition,
  createWorkspaceTemplate,
} from '../services/templateService';

const containerDefinition: IContainerDefinition = {
  containerDefinition: [
    {
      name: 'exampleContainer',
      image: 'jdguillaume/base-code-server-no-auth',
      memory: 512,
      portMappings: [
        {
          containerPort: 8080,
          hostPort: 8080,
          protocol: 'tcp',
        },
      ],
    },
  ],
};

const family = 'frontend-call';

const NewTemplate = () => {
  const [name, setName] = useState('');

  return (
    <Form id="new-template-form" aria-label="New Template">
      <label htmlFor="new-template-name">Template Name </label>
      <input
        id="new-template-name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input />
      <button
        style={{ backgroundColor: 'indigo' }}
        onClick={() => createWorkspaceTemplate(containerDefinition, family)}
      >
        Create Template
      </button>
    </Form>
  );
};

export default NewTemplate;
