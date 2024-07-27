import React from 'react';
import s from './search-bar.module.css';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClick: () => void;
}

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onClick,
}: SearchInputProps) => {
  return (
    <div className={s.searchInputWrapper}>
      <input
        type='text'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder='Search for characters...'
        className={s.searchInput}
      />
      <button onClick={onClick} className={s.searchButton}>
        Search
      </button>
    </div>
  );
};
export default SearchInput;
