import Movie from "../models/Movie";

export async function getMovies(): Promise<Array<Movie>> {
  try {
    const res: Array<Movie> = [];

    const f1 = require('../helpers/PopularMovies_p1.json');
    const f2 = require('../helpers/PopularMovies_p2.json');

    const response = [...(f1.results), ...(f2.results)] 

    response.map((value: any) => {
      res.push(
        {
          id: value.id,
          title: value.title,
          releaseDate: value.release_date,
          voteAverage: value.vote_average,
          overview: value.overview
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};

export async function getMovieById(id: number): Promise<Movie | undefined> {
  try {
    const list: Array<Movie> = [];

    const f1 = require('../helpers/PopularMovies_p1.json');
    const f2 = require('../helpers/PopularMovies_p2.json');

    const response = [...(f1.results), ...(f2.results)] 

    response.map((value: any) => {
      list.push(
        {
          id: value.id,
          title: value.title,
          releaseDate: value.release_date,
          voteAverage: value.vote_average,
          overview: value.overview
        }
      )
    });
    return list.find((m) => m.id === id);
  } catch (error: any) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};
