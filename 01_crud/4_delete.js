import { closeDatabaseConnection, connectToDatabase } from "../db";

async function deleteDocuments() {
    const db = await connectToDatabase;
    const collection = db.collection('users');

    try {
        console.log('--- Deleting a document ---');
        const deleteResult1 = await collection.deleteOne({ name: 'Charlie' });
        console.log(`Delete Result: ${deleteResult1.deletedCount} document deleted.`);

        // console.log('--- Deleting all documents ---');
        // const deleteResult2 = await collection.deleteMany({});
        // console.log(`Delete Result: ${deleteResult2.deletedCount} documents deleted.`);
    } finally {
        await closeDatabaseConnection();
    }
}

deleteDocuments();