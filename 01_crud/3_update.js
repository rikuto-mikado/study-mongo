const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function updateDocuments() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- Updating a document ---');
        const updateResult = await collection.updateOne(
            { name: 'Rikuto' },
            { $set: { age: 29 }}
        );
        console.log(`Update Result: ${updateResult.modifiedCount} document updated.`);
    } finally {
        await closeDatabaseConnection();
    }
}

updateDocuments();