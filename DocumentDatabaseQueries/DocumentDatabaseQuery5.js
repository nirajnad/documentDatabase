import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// Query: update_portfolio_activity.js
// This query updates the "isActive" field for portfolios created in 2021 to true.
// Expected output: Updated documents.

const updatePortfolioActivityAgg = [
  { $match: { "portfolios.creationDate": { $regex: "2021" } } },
  { $set: { "portfolios.isActive": true } }
];

const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabase');
const coll = client.db('yourDatabase').collection('RandomUsers');
await coll.updateMany(updatePortfolioActivityAgg[0].$match, updatePortfolioActivityAgg[1].$set);
await client.close();
