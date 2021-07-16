const fetch = require('node-fetch');

exports.handler = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters
  const movies = await fetch('http://localhost:8888/.netlify/functions/movies').then(res => res.json())
  const movie = movies[id]
  if (!movie) {
    return {
      statusCode: 400,
      body: 'Not found'
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(movie)
  }
}