const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        console.log('--- $all ---');
        const allSkills = await collection.find({
            skills: { $all: ['JavaScript', 'Python'] }
        }).toArray();
        console.log(`Users with both JavaScript and Python skills: ${allSkills.map(u => u.name)}`);

        console.log('--- $size ---');
        const twoSkills = await collection.find({
            skills: { $size: 2 }
        }).toArray();
        console.log(`Users with two skills: ${twoSkills.map(u => u.name)}`);

    } finally {
        await closeDatabaseConnection();
    }
}

run();