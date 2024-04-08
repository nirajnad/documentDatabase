import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// Query: complex_search.js
// This query uses the aggregation framework to find users with portfolios containing transactions related to the Finance sector and with transactions having a price per share greater than 300, or portfolios created in 2021.
// Expected output: Users with relevant portfolios.

const complexSearchAgg = [
  { $unwind: "$portfolios" },
  { $lookup: {
      from: "RandomStocks",
      localField: "portfolios.transactions.stock_id",
      foreignField: "_id",
      as: "stocks"
    }
  },
  { $match: { $or: [{ "stocks.sector": "Finance", "portfolios.transactions.pricePerShare": { $gt: 300 } }, { "portfolios.creationDate": { $regex: "2021" } }] } },
  { $project: { _id: 1, username: 1, "portfolios.portfolioName": 1, "portfolios.description": 1, "portfolios.transactions": 1 } }
];

const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabase');
const coll = client.db('yourDatabase').collection('RandomUsers');
const cursor = coll.aggregate(complexSearchAgg);
const result = await cursor.toArray();
await client.close();
