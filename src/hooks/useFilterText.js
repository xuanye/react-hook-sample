const { useState } = require('react');

export const useFilterText = () => {
  const [filterText, setFilterText] = useState('');

  return {
    filterText,
    setFilterText,
  };
};
