import { useState } from 'react';
import { createModel } from 'hox';

const useFilterText = () => {
  const [filterText, setFilterText] = useState('');

  return {
    filterText,
    setFilterText,
  };
};

export default createModel(useFilterText);
