import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchHistory from '../../Pages/History/useSearchHistory';
import { debounce } from 'lodash';
import {
  clearSearch,
  setQuery,
  setSuggestions,
} from '../../slices/search-slice';
import { useSearchCharactersQuery } from '../../slices/api-slice';
import {
  CharacterWithImage,
  Suggestion,
} from '../../types/star-wars-api-types';

export const useSearchLogic = (initialQuery: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [localQuery, setLocalQuery] = useState(initialQuery);
  const { addSearchQuery } = useSearchHistory();

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 2) {
        dispatch(setQuery(term));
      }
    }, 100),
    [dispatch]
  );

  const { data: searchResults, isLoading } = useSearchCharactersQuery(
    initialQuery,
    {
      skip: initialQuery.length < 3,
    }
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setLocalQuery(queryParam);
      dispatch(setQuery(queryParam));
    } else {
      setLocalQuery('');
      dispatch(clearSearch());
    }
  }, [location.search, dispatch]);

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

  const handleInputChange = (value: string) => {
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleSearch = () => {
    if (localQuery) {
      dispatch(setQuery(localQuery));
      addSearchQuery(localQuery);
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setLocalQuery(suggestion.name);
    dispatch(setQuery(suggestion.name));
    addSearchQuery(suggestion.name);
    navigate(`/character/${suggestion.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    localQuery,
    isLoading,
    handleInputChange,
    handleSearch,
    handleSuggestionClick,
    handleKeyDown,
  };
};
