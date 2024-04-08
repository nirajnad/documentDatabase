import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// Query: count_user_portfolios.js
// This query counts the number of portfolios for a specific user.
// Expected output: User ID, username, and the number of portfolios.

const countUserPortfoliosAgg = [
  { $match: { username: "ivzFKC" } },
  { $project: { _id: 1, username: 1, numberOfPortfolios: { $size: "$portfolios" } } }
];

const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabase');
const coll = client.db('yourDatabase').collection('RandomUsers');
const cursor = coll.aggregate(countUserPortfoliosAgg);
const result = await cursor.toArray();
await client.close();
