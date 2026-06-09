const { connectToDatabase, closeDatabaseConnection } = require('../db');

async function run() {
    const db = await connectToDatabase();
    const collection = db.collection('orders');

    try {
        await collection.deleteMany({});
        await collection.insertMany([
            { product: 'Laptop', category: 'electronics', price: 1200, quantity: 2 },
            { product: 'Mouse', category: 'electronics', price: 25, quantity: 10 },
            { product: 'Keyboard', category: 'electronics', price: 50, quantity: 5 },
            { product: 'T-shirt', category: 'clothing', price: 20, quantity: 15 },
            { product: 'Sneakers', category: 'clothing', price: 80, quantity: 4 },
            { product: 'Jeans', category: 'clothing', price: 60, quantity: 8 }
        ]);

        console.log('--- $group ---');
        const pipeline = [
            {
                $group: {
                    _id: '$category',
                    totalSales: { $sum: '$quantity' }
                }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        console.log(result);
    } finally {
        await closeDatabaseConnection();
    }
}

run();