
require('dotenv').config();
const { OpenAI } = require('openai');

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the .env file');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Creates an embedding for a given text using the OpenAI API.
 * @param {string} text - The text to embed.
 * @returns {Promise<Array<number>>} - A promise that resolves to the embedding vector.
 */
async function embedText(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

module.exports = {
  embedText,
};
