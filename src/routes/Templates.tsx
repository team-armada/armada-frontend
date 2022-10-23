import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteWorkspaceTemplate } from '../services/templateService';

const Templates = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState('');
  const [optionsState, setOptionsState] = useState('');
  const [templates] = useState<string[]>(data);

  interface value {
    value: string;
    text: string;
  }

  const values: value[] = [
    { value: 'date-asc', text: 'Date (Asc)' },
    { value: 'date-desc', text: 'Date (Desc)' },
    { value: 'name-asc', text: 'Name (Asc)' },
    { value: 'name-desc', text: 'Name (Desc)' },
  ];

  return (
    <>
      <section style={{ display: 'flex', padding: '40px' }}>
        <Link to="create-template">
          <button
            style={{ justifyContent: 'right', backgroundColor: 'indigo' }}
          >
            Create Template
          </button>
        </Link>

        <input
          id="environment-search"
          placeholder="Enter environment name..."
          style={{ display: 'block' }}
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={optionsState}
          onChange={e => setOptionsState(e.target.value)}
        >
          {values.map(entry => {
            return (
              <option key={entry.value + entry.text} value={entry.value}>
                {entry.text}
              </option>
            );
          })}
        </select>
      </section>
      <section style={{ display: 'flex' }}>
        {templates.map((template: string) => {
          return (
            <div key={template} style={{ border: 'solid white 1px' }}>
              <p>{template}</p>
              <button onClick={() => deleteWorkspaceTemplate(template)}>
                Delete Me
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Templates;
