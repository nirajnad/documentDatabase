import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// Query: calculate_transaction_volume.js
// This query calculates the total transaction volume for each user.
// Expected output: User IDs and their corresponding total transaction volumes.

const calculateTransactionVolumeAgg = [
  { $unwind: "$portfolios" },
  { $unwind: "$portfolios.transactions" },
  { $group: {
      _id: "$_id",
      username: { $first: "$username" },
      totalVolume: { $sum: "$portfolios.transactions.quantity" }
    }
  }
];

const client = await MongoClient.connect('mongodb://localhost:27017/yourDatabase');
const coll = client.db('yourDatabase').collection('RandomUsers');
const cursor = coll.aggregate(calculateTransactionVolumeAgg);
const result = await cursor.toArray();
await client.close();
