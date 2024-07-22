import { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { setQuery, setSuggestions } from '../../slices/search-slice';
import { RootState } from '../../store/store.ts';
import { useSearchCharactersQuery } from '../../slices/api-slice';
import {
  CharacterWithImage,
  Suggestion,
} from '../../types/star-wars-api-types.ts';
import s from './search-bar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query, suggestions } = useSelector(
    (state: RootState) => state.search
  );

  console.log(query);

  const [localQuery, setLocalQuery] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 2) {
        dispatch(setQuery(term));
      }
    }),
    [dispatch]
  );

  const { data: searchResults, isLoading } = useSearchCharactersQuery(query, {
    skip: query.length < 2,
  });

  console.log(searchResults);

  // useEffect(() => {
  //   if (searchResults) {
  //     const newSuggestions = searchResults.map(
  //       (character: CharacterWithImage) => [character.name, character.id]
  //     );
  //     console.log(newSuggestions);
  //     dispatch(setSuggestions(newSuggestions));
  //   }
  // }, [searchResults, dispatch]);

  useEffect(() => {
    if (searchResults) {
      const newSuggestions: Suggestion[] = searchResults.map(
        (character: CharacterWithImage) => ({
          name: character.name,
          id: character.id,
        })
      );
      dispatch(setSuggestions(newSuggestions));
    }
  }, [searchResults, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
    setShowSuggestions(true);
  };

  console.log(localQuery);

  const handleSearch = () => {
    if (localQuery) {
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // const handleSuggestionClick = (suggestion: Array<string>) => {
  //   setLocalQuery('');
  //   // setLocalQuery(suggestion[0]);
  //   dispatch(setQuery(suggestion[0]));
  //   setShowSuggestions(false);
  //   console.log(suggestion);

  //   navigate(`/character/${suggestion[1]}`);
  // };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setLocalQuery('');
    dispatch(setQuery(suggestion.name));
    setShowSuggestions(false);
    navigate(`/character/${suggestion.id}`);
  };

  return (
    <div className={s.searchBarContainer} ref={searchBarRef}>
      <div className={s.searchInputWrapper}>
        <input
          type='text'
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder='Search for characters...'
          className={s.searchInput}
        />
        <button onClick={handleSearch} className={s.searchButton}>
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && !isLoading && (
        // <ul className={s.suggestions}>
        //   {suggestions.map((suggestion: string[], index: number) => (
        //     <li
        //       key={index}
        //       onClick={() => handleSuggestionClick(suggestion)}
        //       className={s.suggestionItem}
        //     >
        //       {suggestion[0]}
        //     </li>
        //   ))}
        // </ul>

        <ul className={s.suggestions}>
          {suggestions.map((suggestion: Suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={s.suggestionItem}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
