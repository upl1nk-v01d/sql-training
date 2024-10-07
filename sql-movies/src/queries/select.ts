export const selectActorByName = (fullName: string): string => {
  return `SELECT full_name FROM actors WHERE full_name LIKE '${fullName}'`
};

export const selectKeyword = (keyword: string): string => {
  return `SELECT keyword FROM keywords WHERE keyword LIKE '${keyword}'`
};

export const selectDirector = (director: string): string => {
  return `SELECT full_name FROM directors WHERE full_name LIKE '${director}'`
};

export const selectGenre = (genre: string): string => {
  return `SELECT genre FROM genres WHERE genre LIKE '${genre}'`
};

export const selectProductionCompany = (company: string): string => {
  return `SELECT company_name FROM production_companies WHERE company_name LIKE '${company}'`
};

export const selectMovieById = (id: number): string => {
  return `SELECT imdb_id FROM movies WHERE imdb_id = '${id}'`;
};

export const selectGenreById = (id: number): string => {
  return `SELECT genre_id FROM movie_genres WHERE genre_id = '${id}'`;
};

export const selectDirectorById = (id: number): string => {
  return `SELECT director_id FROM movie_directors WHERE director_id = '${id}'`;
};

export const selectActorById = (id: number): string => {
  return `SELECT actor_id FROM movie_actors WHERE actor_id = '${id}'`;
};

export const selectKeywordById = (id: number): string => {
  return `SELECT keyword_id FROM movie_keywords WHERE keyword_id = '${id}'`;
};

export const selectProductionCompanyById = (id: number): string => {
  return `SELECT production_id FROM movie_production_companies WHERE production_id = '${id}'`;
};

export const selectMovie = (imdbId: string): string => {
  return `SELECT imdb_id, original_title FROM movies WHERE imdb_id LIKE '${imdbId}'`
};

export const selectMovieId = (imdbId: string): string => {
  return `SELECT id FROM movies WHERE imdb_id = '${imdbId}'`
};

export const selectRatingsByUserID = (userId: number): string => {
  return `SELECT * FROM movie_ratings WHERE user_id LIKE '${userId}'`
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `select g.genre from movie_genres mg join genres g on g.id = mg.genre_id where mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `select a.full_name from movie_actors ma join actors a on a.id = ma.actor_id where ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `select d.full_name from movie_directors md join directors d on d.id = md.director_id where md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `select k.keyword from movie_keywords mk join keywords k on k.id = mk.keyword_id where mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `select pc.company_name from movie_production_companies mpc join production_companies pc on pc.id = mpc.company_id where mpc.movie_id = ${movieId}`;
};

/**
 * select count as c, because an object is returned and expected property name is c
 */
export const selectCount = (table: string): string => {
  return `SELECT COUNT(*) AS c FROM ${table}`;
};
