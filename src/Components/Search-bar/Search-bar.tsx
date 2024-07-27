import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchLogic } from './use-search-logic.ts';
import { useLocation } from 'react-router-dom';
import { getSearchData } from '../../slices/search-slice.ts';
import SuggestionList from './Suggestion-list.tsx';
import SearchInput from './Search-input.tsx';
import s from './search-bar.module.css';

const SearchBar = () => {
  const { query, suggestions } = useSelector(getSearchData);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const {
    localQuery,
    isLoading,
    handleInputChange,
    handleSearch,
    handleSuggestionClick,
    handleKeyDown,
  } = useSearchLogic(query);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    if (queryParam) {
      handleInputChange(queryParam);
    }
  }, [location.search]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.searchBarContainer} ref={searchBarRef}>
      <SearchInput
        value={localQuery}
        onChange={e => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onClick={handleSearch}
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
