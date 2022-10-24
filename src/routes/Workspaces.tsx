import { useLoaderData } from 'react-router-dom';
import { stopWorkspace } from '../services/workspaceService';

function isStringArray(x: unknown[]): x is string[] {
  return x.every(i => typeof i === 'string');
}

const WorkspaceInformation = (workspaces: unknown) => {
  if (!Array.isArray(workspaces)) {
    throw new Error(
      'Something went wrong while attempting to retrieve your workspaces.'
    );
  }

  if (isStringArray(workspaces)) {
    if (workspaces.length === 0) {
      return <p>You have no active workspaces.</p>;
    } else {
      return (
        <>
          {workspaces.map(workspace => {
            return (
              <div key={workspace} style={{ border: 'solid white 1px' }}>
                <p>{workspace}</p>
                <button onClick={() => stopWorkspace(workspace)}>
                  Stop Workspace
                </button>
              </div>
            );
          })}
        </>
      );
    }
  }
};

const Workspaces = () => {
  const activeWorkspaces = useLoaderData();

  return (
    <>
      <h1>Workspaces</h1>
      {WorkspaceInformation(activeWorkspaces)}
    </>
  );
};

export default Workspaces;
