const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function insertDocument() {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        const result_1 = await collection.insertOne({
            name: "Rikuto",
            age: 19,
            skills: ["JavaScript", "Node.js"]
        });
        console.log(`Added document with _id: ${result_1.insertedId}`);

        const result_2 = await collection.insertMany([
            { name: "Sam", age: 22, skills: ["Python", "Django"] },
            { name: "Alex", age: 25, skills: ["Java", "Vue"] },
            { name: "Taylor", age: 30, skills: ["C#", "React"] }
        ]);
        console.log(`Added documents with _ids: ${Object.values(result_2.insertedIds).join(', ')}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await closeDatabaseConnection();
    }
}

insertDocument();