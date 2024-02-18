const { MongoClient, ObjectId } = require('mongodb')

const main = async () => {
    const uri = "mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected successfully');

        const database = client.db('User');
        const collection = database.collection('User');

        const result = await collection.findOne({username: 'user'});

        if (result) {
            console.log('Retrieved document:', result);
        } else {
            console.log('Document not found');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

main()