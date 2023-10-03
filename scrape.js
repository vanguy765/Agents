import axios from 'axios'
import { JSDOM } from 'jsdom'

export async function scrapeWebsite(url) {
  console.log(`scrapping website ${url}`)

  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }

  const data = { url: url }

  const postUrl = `https://chrome.browserless.io/content?token=${process.env.BROWSERLESS_API_KEY}`

  try {
    const response = await axios.post(postUrl, data, { headers: headers })

    const dom = new JSDOM(response.data)
    const text = dom.window.document.documentElement.textContent

    return text
  } catch (error) {
    console.log(`HTTP request failed with status code ${error.response.status}`)
  }
}
