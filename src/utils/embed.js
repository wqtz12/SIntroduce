require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// The dimension for Google's embedding-001 model
const EMBEDDING_DIMENSION = 768;

let genAI;

function getGoogleAI() {
  if (!genAI) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not set in your environment.');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Creates an embedding for a given text using Google's Generative AI.
 * @param {string} text - The text to embed.
 * @returns {Promise<Array<number>>} - A promise that resolves to the embedding vector.
 */
async function embedText(text) {
  if (process.env.USE_PLACEHOLDERS === 'true') {
    console.log(`[Placeholder] Embedding text: "${text}"`);
    const dummyVector = Array(EMBEDDING_DIMENSION).fill(0);
    dummyVector[0] = 1;
    return dummyVector;
  }

  // --- Google Model ---
  const client = getGoogleAI();
  const model = client.getGenerativeModel({ model: "embedding-001"});
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values;
}

module.exports = {
  embedText,
};
