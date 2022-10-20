import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const [search, setSearch] = useState('');
  const [optionsState, setOptionsState] = useState('');
  const [templates, setTemplates] = useState([]);

  interface value {
    value: string;
    text: string;
  }

  interface template {
    name: string;
    environment: string;
    version: string;
    dateCreated: string;
    id: number;
  }

  const values: value[] = [
    { value: 'date-asc', text: 'Date (Asc)' },
    { value: 'date-desc', text: 'Date (Desc)' },
    { value: 'name-asc', text: 'Name (Asc)' },
    { value: 'name-desc', text: 'Name (Desc)' },
  ];

  const dummyTemplates: template[] = [
    {
      name: 'JS109 Intro to JavaScript',
      environment: 'Coder',
      version: '1.2.1',
      dateCreated: 'Oct 20th, 2022',
      id: 1,
    },
    {
      name: 'JS120 Intermediate JavaScript',
      environment: 'Coder',
      version: '1.2.1',
      dateCreated: 'Oct 20th, 2022',
      id: 2,
    },
    {
      name: 'JS130 Advanced JavaScript',
      environment: 'Coder',
      version: '1.2.1',
      dateCreated: 'Oct 20th, 2022',
      id: 3,
    },
    {
      name: 'LS180 Intro to Databases',
      environment: 'Coder',
      version: '1.2.1',
      dateCreated: 'Oct 20th, 2022',
      id: 4,
    },
  ];

  useEffect(() => {
    setTemplates(dummyTemplates);
  }, []);

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
          value={search ? search : undefined}
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
        {templates.map((template: template) => {
          return (
            <div key={template.id} style={{ border: 'solid white 1px' }}>
              <p>{template.name}</p>
              <p>{template.environment}</p>
              <p>version {template.version}</p>
              <p>{template.dateCreated}</p>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Templates;
