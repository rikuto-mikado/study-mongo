const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- Implicit AND ---');
        const andResult = await collection.find({
            age: { $lt: 25 },
            skills: 'JavaScript'
        }).toArray();
        console.log('Users aged under 25 and have JavaScript skill:', andResult.map(u => u.name));

        console.log('--- $or ---');
        const orResult = await collection.find({
            $or: [
                { age: { $gte: 30 } },
                { skills: 'Python' }
            ]
        }).toArray();
        console.log('Users aged 30 or older or have Python skill:', orResult.map(u => u.name));

        console.log('--- $ne (Not Equal) ---');
        const notBob = await collection.find({ name: { $ne: 'Bob' } }).toArray();
        console.log('Users except Bob:', notBob.map(u => u.name));
    } finally {
        await closeDatabaseConnection();
    }
}

run();
