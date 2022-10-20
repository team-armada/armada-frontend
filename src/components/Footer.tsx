const Footer = () => {
  const today = new Date();
  return <footer>&copy;{` ${today.getFullYear()} Armada Team`}</footer>;
};

export default Footer;
