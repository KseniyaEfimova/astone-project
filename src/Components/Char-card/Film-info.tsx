import { useGetFilmQuery } from '../../slices/api-slice';
import { FilmInfoProps } from '../../types/star-wars-api-types';

const FilmInfo = ({ filmUrl }: FilmInfoProps) => {
  const filmId = filmUrl.split('/').slice(-2)[0];
  const { data: film, isLoading, error } = useGetFilmQuery(parseInt(filmId));

  if (isLoading) return <h3>Loading film data...</h3>;
  if (error)
    return (
      <h3>
        Error loading film data:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </h3>
    );
  if (!film) return <h3>No film data available</h3>;

  return <>{film.title}</>;
};

export default FilmInfo;
