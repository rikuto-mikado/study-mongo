const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('orders');

    try {
        
    } finally {
        await closeDatabaseConnection();
    }
}

run();