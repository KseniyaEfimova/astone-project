import SearchBar from '../../Components/Search-bar/Search-bar';
import Characters from '../../Pages/Characters/Characters-list';
import { useLocation } from 'react-router-dom';
import { useSearchCharactersQuery } from '../../slices/api-slice';
import s from './search-page.module.css'; // TODO: css

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchCharactersQuery(query);

  return (
    <section className={s.searchPage}>
      <div className={s.searchBar}>
        <SearchBar />
      </div>
      <div className={s.searchResults}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error occurred while searching.</p>}
        {searchResults && searchResults.length === 0 && (
          <p>No results found.</p>
        )}
        {searchResults && <Characters charactersData={searchResults} />}
      </div>
    </section>
  );
};

export default SearchPage;
