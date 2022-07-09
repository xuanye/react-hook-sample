import { useEffect, useState } from 'react';

import { createModel } from 'hox';
import useAddress from './useAddress';

const useFilterText = () => {
  const [filterText, setFilterText] = useState('');

  return {
    filterText,
    setFilterText,
  };
};

export default createModel(useFilterText);
