import { useGetFilmQuery } from '../../slices/api-slice';
import PropTypes from 'prop-types';
import { FilmInfoProps } from '../../types/star-wars-api-types';

const FilmInfo = ({ filmUrl }: FilmInfoProps) => {
  const { data: film, isLoading, error } = useGetFilmQuery(filmUrl);

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

FilmInfo.propTypes = {
  filmUrl: PropTypes.string.isRequired,
};

export default FilmInfo;
