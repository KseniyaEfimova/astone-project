import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import s from './search-bar.module.css'; // TODO: css
import SuggestionList from './SuggestionList.tsx';
import SearchInput from './SearchInput';
import { useSearchLogic } from './useSearchLogic.ts';

const SearchBar: React.FC = () => {
  const { query, suggestions } = useSelector(
    (state: RootState) => state.search
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const {
    localQuery,
    isLoading,
    handleInputChange,
    handleSearch,
    handleSuggestionClick,
  } = useSearchLogic(query);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
    setShowSuggestions(false);
  };

  return (
    <div className={s.searchBarContainer} ref={searchBarRef}>
      <SearchInput
        value={localQuery}
        onChange={e => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onClick={handleSearchButtonClick}
      />
      {showSuggestions && suggestions.length > 0 && !isLoading && (
        <SuggestionList
          suggestions={suggestions}
          onSuggestionClick={suggestion => {
            handleSuggestionClick(suggestion);
            setShowSuggestions(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
