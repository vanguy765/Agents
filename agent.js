import { ChatOpenAI } from 'langchain/chat_models/openai'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SearchTool } from './search.js'

const tools = [new SearchTool()]

const chat = new ChatOpenAI({ modelName: 'gpt-4', temperature: 0 })

const executor = await initializeAgentExecutorWithOptions(tools, chat, {
  agentType: 'openai-functions',
  verbose: true,
})

const result = await executor.run('Search for Kluge & Schlaak GmbH')
console.log(result)
