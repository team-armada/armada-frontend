import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { IBaseTemplate } from '../services/templateService';
import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

const Templates = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState('');
  const [optionsState, setOptionsState] = useState('');
  const [templates] = useState<IBaseTemplate[]>(data);

  return (
    <AdminPrivateRoute>
      <div>
        {templates.map(template => {
          return (
            <div key={template.name}>
              <p>{template.name}</p>
              {template.definition.containerDefinition.map(container => {
                return (
                  <div key={container.name}>
                    <p>Container Name:{container.name}</p>
                    <p>Image: {container.image}</p>
                    <p>Data Path:{container.mountPoints[0].containerPath}</p>
                  </div>
                );
              })}
              <Link to={`/workspaces?template=${template.name}`}>
                <button>Create Workspace from Template</button>
              </Link>
            </div>
          );
        })}
      </div>
    </AdminPrivateRoute>
    // have id for each template
    // have status for selected template | either null or the id
    // if not null, display selected id contents
  );
};

export default Templates;
