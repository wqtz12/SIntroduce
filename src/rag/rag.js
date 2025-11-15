const { queryVectors, initIndex } = require('../utils/vectorStore');
const { embedText } = require('../utils/embed');

async function getQueryEmbedding(query) {
  console.log(`Embedding query: "${query}"`);
  return await embedText(query);
}

/**
 * Retrieves relevant documents from the vector store.
 * @param {string} query - The user's query.
 * @param {number} topK - The number of documents to retrieve.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of retrieved documents.
 */
async function retrieve(query, topK) {
  const indexName = 'experiences'; // Or get it from config
  const index = await initIndex(indexName);

  const queryEmbedding = await getQueryEmbedding(query);

  const results = await queryVectors(index, queryEmbedding, topK);
  return results.matches.map(match => match.metadata.text);
}

/**
 * Generates a response based on the retrieved documents.
 * @param {string} query - The user's query.
 * @param {Array<string>} documents - The retrieved documents.
 * @returns {Promise<string>} - A promise that resolves to the generated response.
 */
async function generate(query, documents) {
  // In a real application, you would use a large language model (LLM)
  // to generate a response based on the query and the retrieved documents.
  // Example using a placeholder:

  const prompt = `Query: ${query}\n\nDocuments:\n${documents.join('\n\n')}\n\nAnswer:`;

  console.log('---PROMPT SENT TO LLM---');
  console.log(prompt);
  console.log('-------------------------');

  // Replace this with a call to your LLM (e.g., OpenAI's GPT, Anthropic's Claude, or a self-hosted model).
  const generatedText = `Based on the retrieved documents, here is the answer to your query: "${query}"`;

  return Promise.resolve(generatedText);
}

/**
 * The main RAG pipeline.
 * @param {string} query - The user's query.
 * @param {number} [topK=3] - The number of documents to retrieve.
 * @returns {Promise<string>} - A promise that resolves to the final generated answer.
 */
async function rag(query, topK = 3) {
  const documents = await retrieve(query, topK);
  const answer = await generate(query, documents);
  return answer;
}

module.exports = {
  rag,
  retrieve,
  generate,
};
