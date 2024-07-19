export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharacterWithImage extends Character {
  imageUrl: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Film {
  title: string;
  episode_id: number;
}

export interface Planet {
  name: string;
}

export interface FilmResponse {
  results: Film[];
}

export interface PlanetResponse {
  results: Planet[];
}

export interface FilmInfoProps {
  filmUrl: string;
}

export interface PlanetInfoProps {
  planetUrl: string;
}
