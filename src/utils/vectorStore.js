require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
  throw new Error('Pinecone environment or api key variables are missing');
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

/**
 * Initializes a Pinecone index.
 * @param {string} indexName - The name of the index.
 * @returns {Promise<object>} - The Pinecone index object.
 */
async function initIndex(indexName) {
  const indexList = await pinecone.listIndexes();
  if (!indexList.includes(indexName)) {
    await pinecone.createIndex({
      createRequest: {
        name: indexName,
        dimension: 1536, // Example dimension, adjust as needed
        metric: 'cosine', // Example metric, adjust as needed
      },
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
  await index.upsert({ upsertRequest: { vectors } });
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
    queryRequest: {
      vector,
      topK,
      includeValues: false,
      includeMetadata: true,
    },
  });
  return results;
}

module.exports = {
  initIndex,
  upsertVectors,
  queryVectors,
};
