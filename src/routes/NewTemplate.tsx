import { useState } from 'react';
import { Form } from 'react-router-dom';

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
      <button style={{ backgroundColor: 'indigo' }}>Create Template</button>
    </Form>
  );
};

export default NewTemplate;
