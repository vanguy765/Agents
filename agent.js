import { scrapeWebsite } from './scrape.js'
import { summary } from './summary.js'
;(async () => {
  try {
    const scrappingResult = await scrapeWebsite(
      'https://klugeundschlaak.de/beste-chatgpt-prompts-fuers-taegliche-arbeiten',
    )
    const summaryResult = await summary(scrappingResult)
    console.log('Summary:', summaryResult)
  } catch (error) {
    console.error('An error occurred:', error)
  }
})()
