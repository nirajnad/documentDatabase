import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// Query: find_technology_portfolios.js
// This query uses the aggregation framework to find users with portfolios containing transactions related to the Technology sector.
// Expected output: Users with relevant portfolios.

const findTechnologyPortfoliosAgg = [
  { $unwind: "$portfolios" },
  { $lookup: {
      from: "RandomStocks",
      localField: "portfolios.transactions.stock_id",
      foreignField: "_id",
      as: "stocks"
    }
  },
  { $match: { "stocks.sector": "Technology" } },
  { $project: { _id: 1, username: 1, "portfolios.portfolioName": 1, "portfolios.description": 1, "portfolios.transactions": 1 } }
];

const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabase');
const coll = client.db('yourDatabase').collection('RandomUsers');
const cursor = coll.aggregate(findTechnologyPortfoliosAgg);
const result = await cursor.toArray();
await client.close();
