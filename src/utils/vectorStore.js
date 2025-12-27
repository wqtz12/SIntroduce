require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone api key variable is missing');
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

/**
 * Initializes a Pinecone index.
 * @param {string} indexName - The name of the index.
 * @returns {Promise<object>} - The Pinecone index object.
 */
async function initIndex(indexName) {
  const indexList = await pinecone.listIndexes();
  if (!indexList.indexes.some(index => index.name === indexName)) {
    await pinecone.createIndex({
      name: indexName,
      dimension: 384,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
  }
  return pinecone.Index(indexName);
}

/**
 * Upserts vectors into a Pinecone index.
 * @param {object} index - The Pinecone index object.
 * @param {Array<object>} vectors - An array of vectors to upsert.
 */
async function upsertVectors(index, vectors) {
  await index.upsert(vectors);
}

/**
 * Queries for similar vectors in a Pinecone index.
 * @param {object} index - The Pinecone index object.
 * @param {Array<number>} vector - The query vector.
 * @param {number} topK - The number of similar vectors to return.
 * @returns {Promise<object>} - The query results.
 */
async function queryVectors(index, vector, topK) {
  const results = await index.query({
    vector,
    topK,
    includeValues: false,
    includeMetadata: true,
  });
  return results;
}

module.exports = {
  initIndex,
  upsertVectors,
  queryVectors,
};
