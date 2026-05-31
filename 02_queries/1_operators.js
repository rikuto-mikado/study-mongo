const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- $gt (Greater than) ---');
        const over30 = await collection.find({ age: { $gt: 30 } }).toArray();
        console.log('Users older than 30:', over30.map(u => u.name));

        console.log('--- $lte (Less than or equal) ---');
        const underOr25 = await collection.find({ age: { $lte: 25 } }).toArray();
        console.log('Users aged 25 or younger:', underOr25.map(u => u.name));

        console.log('--- $in (In) ---')
        const specificUsers = await collection.find({ name: { $in: ['Alice', 'Diana'] } }).toArray();
        console.log('Users named Alice or Diana:', specificUsers.map(u => u.name));
    } finally {
        await closeDatabaseConnection();
    }
}

run();