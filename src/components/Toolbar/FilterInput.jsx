import React, { useEffect } from 'react';
import classNames from 'classnames';
import useFilterText from '@/hooks/useFilterText';

function FilterInput({ editMode }) {
  const { filterText, setFilterText } = useFilterText();
  useEffect(() => {
    if (editMode) {
      setFilterText('');
    }
  }, [setFilterText, editMode]);
  return (
    <div className={classNames('column', 'col-6')}>
      <input
        className={classNames('form-input')}
        style={{ maxWidth: '300px' }}
        type='text'
        value={filterText}
        onChange={e => {
          setFilterText(e.target.value || '');
        }}
        disabled={editMode}
        placeholder='Filter text'
      />
    </div>
  );
}

export default FilterInput;
