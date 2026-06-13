const { connectToDatabase, closeDatabaseConnection } = require("../db");

async function run() {
    const db = await connectToDatabase();
    const usersColl = db.collection('users_rel');
    const postsColl = db.collection('posts_rel');

    try {
        await usersColl.deleteMany({});
        await postsColl.deleteMany({});

        const usersResult = await usersColl.insertOne({ name: 'Frank', age: 30 });
        const userId = userResult.insertedId;

        await postsColl.insertMany([
            { auther_id: userId, title: 'Testing reference patterns', content: 'Save to a collection separately' },
            { auther_id: userId, title: 'Second post', content: 'This is a practice post' }
        ]);

        console.log('--- $lookup ---');
        const pipeline = [
            { $match: { name: 'Riku' } },
            {
                $lookup: {
                    from: 'posts_rel',
                    localField: '_id',
                    foreignField: 'auther_id',
                    as: 'user_posts'
                }
            }
        ];

        const result = await usersColl.aggregate(pipeline).toArray();
        console.log(JSON.stringify(result, null, 2));
    } finally {
        await connectToDatabase();
    }
}

run();