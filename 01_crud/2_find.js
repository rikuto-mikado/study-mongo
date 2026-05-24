const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function findDocuments() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- Finding Documents ---');
        const allUsers = await collection.find({}).toArray();
        console.log(`Here's all the users: ${JSON.stringify(allUsers)}`);

        console.log('--- Finding Users Older than 20 ---');
        const usersOlderThan20 = await collection.find({ age: { $gt: 20 } }).toArray();
        console.log(`Here's users older than 20: ${JSON.stringify(usersOlderThan20)}`);

        console.log('--- Finding Users with JavaScript Skill ---');
        const usersWithJsSkill = await collection.find({ skills: 'JavaScript' }).toArray();
        console.log(`Here's users with JavaScript skill: ${JSON.stringify(usersWithJsSkill)}`);
    } finally {
        await closeDatabaseConnection();
    }
}

findDocuments();