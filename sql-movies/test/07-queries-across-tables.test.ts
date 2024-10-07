import { Database } from "../src/database";
import { ACTORS, DIRECTORS, GENRES, KEYWORDS, MOVIE_ACTORS, MOVIE_DIRECTORS, MOVIE_GENRES, MOVIE_KEYWORDS, MOVIE_RATINGS, MOVIES } from "../src/table-names";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("06", "07");
  }, minutes(3));

  it(
    "should select top three directors ordered by total budget spent in their movies",
    async done => {
      const query = `
        SELECT 
          ${DIRECTORS}.full_name AS director,   
          ${MOVIES}.budget AS total_budget
        FROM ${MOVIES}, ${DIRECTORS}, ${MOVIE_DIRECTORS}
        INNER JOIN ${MOVIES} ON ${MOVIES}.id = ${MOVIE_DIRECTORS}.movie_id
        INNER JOIN ${DIRECTORS} ON ${MOVIES}.id = ${MOVIE_DIRECTORS}.movie_id
        ORDER BY total_budget
        DESC
        LIMIT 3
      `;

      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          director: "Ridley Scott",
          total_budget: 722882143.58
        },
        {
          director: "Michael Bay",
          total_budget: 518297522.1
        },
        {
          director: "David Yates",
          total_budget: 504100108.5
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top 10 keywords ordered by their appearance in movies",
    async done => {
      const query = `
        SELECT 
          tagline as keyword,
          COUNT (keyword) AS count        
        FROM ${MOVIES}, ${KEYWORDS}, ${MOVIE_KEYWORDS}
        INNER JOIN ${MOVIES} ON ${MOVIES}.id = ${MOVIE_KEYWORDS}.movie_id
        INNER JOIN ${KEYWORDS} ON ${MOVIES}.id = ${MOVIE_KEYWORDS}.movie_id
        ORDER BY count
        GROUP BY keyword
        DESC
        LIMIT 10
      `;

      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          keyword: "woman director",
          count: 162
        },
        {
          keyword: "independent film",
          count: 115
        },
        {
          keyword: "based on novel",
          count: 85
        },
        {
          keyword: "duringcreditsstinger",
          count: 82
        },
        {
          keyword: "biography",
          count: 78
        },
        {
          keyword: "murder",
          count: 66
        },
        {
          keyword: "sex",
          count: 60
        },
        {
          keyword: "revenge",
          count: 51
        },
        {
          keyword: "sport",
          count: 50
        },
        {
          keyword: "high school",
          count: 48
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select all movies called Life and return amount of actors",
    async done => {
      const query = `
        SELECT 
          COUNT (actors) AS count        
        FROM ${MOVIES}, ${ACTORS}, ${MOVIE_ACTORS}
        WHERE original_title LIKE 'Life'
        INNER JOIN ${MOVIES} ON ${MOVIES}.id = ${MOVIE_ACTORS}.movie_id
        INNER JOIN ${ACTORS} ON ${MOVIES}.id = ${MOVIE_ACTORS}.movie_id
      `;

      const result = await db.selectSingleRow(query);

      expect(result).toEqual({
        original_title: "Life",
        count: 12
      });

      done();
    },
    minutes(3)
  );

  it(
    "should select three genres which has most ratings with 5 stars",
    async done => {
      const query = `
        SELECT 
          genre,
          COUNT (*) AS five_stars_count        
        FROM ${MOVIES}, ${MOVIE_RATINGS}, ${MOVIE_GENRES}
        WHERE five_stars_count >= 5
        INNER JOIN ${MOVIES} ON ${MOVIES}.id = ${MOVIE_GENRES}.movie_id
        INNER JOIN ${GENRES} ON ${MOVIES}.id = ${MOVIE_GENRES}.movie_id
        ORDER BY five_stars_count
        DESC
        LIMIT 3
      `;

      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Drama",
          five_stars_count: 15052
        },
        {
          genre: "Thriller",
          five_stars_count: 11771
        },
        {
          genre: "Crime",
          five_stars_count: 8670
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three genres ordered by average rating",
    async done => {
      const query = `
        SELECT 
          genre,
          AVG (popularity) AS avg_rating
        FROM ${MOVIES}, ${GENRES}, ${MOVIE_GENRES}
        INNER JOIN ${MOVIES} ON ${MOVIES}.id = ${MOVIE_GENRES}.movie_id
        INNER JOIN ${GENRES} ON ${MOVIES}.id = ${MOVIE_GENRES}.movie_id
        ORDER BY avg_rating
        DESC
        LIMIT 3
      `;

      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Crime",
          avg_rating: 3.79
        },
        {
          genre: "Music",
          avg_rating: 3.73
        },
        {
          genre: "Documentary",
          avg_rating: 3.71
        }
      ]);

      done();
    },
    minutes(3)
  );
});
