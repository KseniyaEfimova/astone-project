import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../../Components/Search-bar/Search-bar';
import Characters from '../Characters/Characters-list';
import { useGetSomeCharactersQuery } from '../../slices/api-slice';
import { setCharacters } from '../../slices/characters-slice';
import { clearSearch } from '../../slices/search-slice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: initialCharacters, isLoading } = useGetSomeCharactersQuery();

  useEffect(() => {
    dispatch(clearSearch());
    if (initialCharacters) {
      console.time('Dispatch setCharacters');
      dispatch(setCharacters(initialCharacters));
      console.timeEnd('Dispatch setCharacters');
    }
  }, [dispatch, initialCharacters]);

  useEffect(() => {
    if (isLoading) {
      console.time('API request');
    } else {
      console.timeEnd('API request');
    }
  }, [isLoading]);

  return (
    <>
      <SearchBar />
      <Characters />
    </>
  );
};

export default HomePage;
