const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function insertDocument() {
    const db = await connectToDatabase();
}