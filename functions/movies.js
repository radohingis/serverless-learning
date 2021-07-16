const fetch = require('node-fetch');
const { query } = require('./util/hasura')

exports.handler = async () => {

  const { movies } = await query({
    query: `
      query {
        movies {
          id
          poster
          tagline
          title
        }
      }
    `
  })

  const promises = movies.map(movie => {

    return fetch(`http://www.omdbapi.com/?i=${movie.id}&apikey=${process.env.OMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const scores = data.Ratings

        return {
          ...movie,
          scores
        }
      })
  })

  const moviesWithRatings = await Promise.all(promises)

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  }
}