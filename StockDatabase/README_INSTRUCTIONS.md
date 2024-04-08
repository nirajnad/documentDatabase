# MongoDB Database Restoration Instructions

This document provides the necessary steps to restore the `StockDatabase` from the dump files.

1. Open MongoDB Compass and connect to your MongoDB instance.
2. Create a Database called "StockDatabase"
3. Create a Collection called "Users" and "Stocks".
4. Import the Collections:
        In the left sidebar, click on the database into which you want to import your collections.
        For importing each collection (users and stocks), follow these steps:
        1. Click the Add Data dropdown and select Import File.
        2. In the dialog that opens, click Select File and navigate to either RandomUsers.json or RandomStocks.json.
        3. Set the import format to JSON.
        4. Type the collection name (users for RandomUsers.json and stocks for RandomStocks.json).
        5. Click Import.


(The other things in this file were made when I did mongodump, I'm not sure if they are necessary but if they are feel free to use them instead)
