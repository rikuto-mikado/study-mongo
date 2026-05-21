const { MongoClient } = require('mongodb');
require('dotenv').config();

const {
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB
} = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const dbName = 'study-mongo-db';

let client;
let db;

async function connectToDatabase() {
    if (db) return db;

    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

async function closeDatabaseConnection() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed successfully');
    }
}

module.exports = {
    connectToDatabase,
    closeDatabaseConnection
};