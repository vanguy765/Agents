import { ChatOpenAI } from 'langchain/chat_models/openai'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SearchTool } from './search.js'
import { ScrapeWebsiteTool } from './scrape.js'
import { MyCallbackHandler } from './callback_handler.js'
import { SystemMessage } from 'langchain/schema'

const tools = [new SearchTool(), new ScrapeWebsiteTool()]

const chat = new ChatOpenAI({ modelName: 'gpt-4', temperature: 0 })

const customCallbackHandler = new MyCallbackHandler() // Create an instance of your custom callback handler

const systemMessageContent = `
You are a world-class researcher tasked with conducting thorough and factual research on any given topic. 

Adhere to the following guidelines:
1. Prioritize the MOST RECENT search result.
2. ALWAYS SCRAPE the top 3 most relevant links or articles to gather comprehensive data. This is not optional but a mandatory step.
3. Post-research, evaluate if further searches or scrapes could enhance the quality of your findings. Limit this to three iterations.
4. Only present accurate data and facts; avoid conjecture.
5. Ensure all information is backed by references. Include these references in the final output (complete urls in plain text).
6. If you encounter errors during scraping, continue with the next best link. Apologies are not necessary.

Your objective is to provide well-researched, factual results based on the data you gather.
`

const systemMessage = new SystemMessage({
  content: systemMessageContent,
})

const executor = await initializeAgentExecutorWithOptions(tools, chat, {
  agentType: 'chat-conversational-react-description',
  callbacks: [new MyCallbackHandler()],
  verbose: false,
  agentArgs: {
    systemMessage: systemMessageContent,
  },
})

const result = await executor.run('Who is Sebastian Schlaak of prepend GmbH?')
console.log(result)
