import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../Components/Search-bar/Search-bar';
import Characters from '../Characters/Characters-list';
import {
  useSearchCharactersQuery,
  useGetSomeCharactersQuery,
} from '../../slices/api-slice';
import { RootState } from '../../store/store';
import { setCharacters } from '../../slices/characters-slice';
import { setQuery } from '../../slices/search-slice';
import s from './search-page.module.css';

const SearchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useSelector((state: RootState) => state.search.query);

  const { data: initialCharacters } = useGetSomeCharactersQuery();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q') || '';
    if (queryParam !== query) {
      dispatch(setQuery(queryParam));
    }
  }, [location.search, dispatch, query]);

  const { data: searchResults } = useSearchCharactersQuery(query, {
    skip: !query,
  });

  console.log(initialCharacters);
  console.log(searchResults);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      dispatch(setCharacters(searchResults));
    } else if (
      initialCharacters &&
      (!searchResults || searchResults.length === 0)
    ) {
      dispatch(setCharacters(initialCharacters));
    }
  }, [searchResults, initialCharacters, dispatch]);

  return (
    <section className={s.searchPage}>
      <div className={s.searchBar}>
        <SearchBar />
      </div>
      <div className={s.searchResults}>
        {searchResults?.length === 0 ? (
          <h2>No results found</h2>
        ) : (
          <Characters />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
