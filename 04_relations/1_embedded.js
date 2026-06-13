// Embedded Documents (Denormalization)
// This is the most fundamental way to model relationships in MongoDB.

// By nesting related data directly within a single document, you can:
// - Achieve high performance: All data is retrieved in a single read operation.
// - Maintain atomicity: Updates to the main document and its embedded data are atomic.

// Use this pattern when:
// - Data is frequently accessed together.
// - There is a "one-to-few" or "one-to-many" relationship where the "many" side 
// doesn't grow indefinitely.

const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('users_with_posts');

    try {
        await collection.deleteMany({}); // Initialization
        await collection.insertOne({
            name: 'Riku',
            age: '20',
            posts: [
                { title: 'started learning MongoDB', views: 100 },
                { title: "Convenient for embedding", views: 100 }
            ]
        });

        const user = await collection.findOne({ name: 'Riku' });
        console.log('--- Retrieving embedded documents ---');
        console.log(JSON.stringify(user, null, 2));
    } finally {
        await closeDatabaseConnection();
    }
}

run();