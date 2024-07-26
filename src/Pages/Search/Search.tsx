import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSearchCharactersQuery } from '../../slices/api-slice';
import { RootState } from '../../store/store';
import { setCharacters } from '../../slices/characters-slice';
import { setQuery } from '../../slices/search-slice';
import SearchBar from '../../Components/Search-bar/Search-bar';
import CharactersWrapper from '../Characters/CharactersWrapper';
import useSearchHistory from '../History/useSearchHistory';
import s from './search-page.module.css';

const SearchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useSelector((state: RootState) => state.search.query);
  const { addSearchQuery } = useSearchHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q') || '';
    console.log(query);
    addSearchQuery(queryParam);
    if (queryParam !== query) {
      dispatch(setQuery(queryParam));
    }
  }, [location.search, dispatch, query]);

  const { data: searchResults } = useSearchCharactersQuery(query, {
    skip: !query,
  });

  console.log(searchResults);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      dispatch(setCharacters(searchResults));
    }
  }, [searchResults, dispatch]);

  const characterIds = searchResults
    ? searchResults.map(character => character.id)
    : [];

  return (
    <section className={s.searchPage}>
      <div className={s.searchBar}>
        <SearchBar />
      </div>
      <div className={s.searchResults}>
        {searchResults?.length === 0 ? (
          <h2>No results found</h2>
        ) : (
          <CharactersWrapper
            characterIds={characterIds}
            isFavoritesPage={false}
          />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
