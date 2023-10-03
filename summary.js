import { ChatOpenAI } from 'langchain/chat_models/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { RetrievalQAChain } from 'langchain/chains'

const llm = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' })

export async function summary(data) {
  console.log(data)

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 1000,
  })

  const splitted = await textSplitter.createDocuments([data])

  console.log('splitted:', splitted)
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitted,
    new OpenAIEmbeddings(),
  )

  const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever())

  const response = await chain.call({
    query: 'Can you provide a summary of the content?',
  })

  return response
}
