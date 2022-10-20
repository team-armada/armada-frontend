import { useState } from 'react';

const Footer = () => {
  const getCurrentYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return year;
  };

  const [year, setYear] = useState(getCurrentYear);

  return <footer>&copy;{` ${year} Armada Team`}</footer>;
};

export default Footer;
