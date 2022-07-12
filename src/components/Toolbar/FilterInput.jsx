import React, { useEffect } from 'react';
import classNames from 'classnames';
import useFilterText from '@/hooks/useFilterText';
import PropTypes from 'prop-types';

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
        onChange={(e) => {
          setFilterText(e.target.value || '');
        }}
        disabled={editMode}
        placeholder='Filter text'
      />
    </div>
  );
}
FilterInput.propTypes = {
  editMode: PropTypes.bool.isRequired,
};
export default FilterInput;
