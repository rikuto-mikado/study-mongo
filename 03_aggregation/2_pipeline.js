const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await closeDatabaseConnection();
    const collection = db.collection('orders');

    try {
        
    } finally {
        await closeDatabaseConnection();
    }
}

run();