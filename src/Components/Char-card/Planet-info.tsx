import { useGetPlanetQuery } from '../../slices/api-slice';
import { PlanetInfoProps } from '../../types/star-wars-api-types';

const PlanetInfo = ({ planetUrl }: PlanetInfoProps) => {
  const planetId = planetUrl.split('/').slice(-2)[0];
  const {
    data: planet,
    isLoading,
    error,
  } = useGetPlanetQuery(parseInt(planetId));

  if (isLoading) return <h3>Loading planet data...</h3>;
  if (error)
    return (
      <h3>
        Error loading planet data:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </h3>
    );
  if (!planet) return <h3>No planet data available</h3>;

  return <>{planet.name}</>;
};

export default PlanetInfo;
