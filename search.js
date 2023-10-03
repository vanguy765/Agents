import axios from 'axios'

const serper_api_key = process.env.SERPER_API_KEY

export async function search(query) {
  console.log(`Search for ${query}`)
  const url = 'https://google.serper.dev/search'

  const headers = {
    'X-API-KEY': serper_api_key,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(url, { q: query }, { headers: headers })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error making the request:', error)
    throw error
  }
}
