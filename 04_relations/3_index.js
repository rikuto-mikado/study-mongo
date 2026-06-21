const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- Creating an index ---');
        const indexName = await collection.createIndex({ name: 1 });
        console.log(`Created index: ${indexName}`);

        const indexes = await collection.indexes();
        console.log('Current list of indices');
        console.log(indexes);
    } finally {
        await closeDatabaseConnection();
    }
}

run();