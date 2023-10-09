const { MongoClient, ObjectId } = require('mongodb')

const main = async () => {
    const uri = "mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected successfully');

        const database = client.db('documentation'); // Replace 'your-database-name' with your actual database name
        const collection = database.collection('documentation'); // Replace 'documentation' with your actual collection name

        const documentId = '6523592fd730e1f9120fbef6';

        const query = { _id: new ObjectId(documentId) };
        const result = await collection.findOne(query);

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

const main2 = async () => {
    const uri = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
    const client = new MongoClient(uri)

    try {
        await client.connect()
        console.log('connected successfully')
    } catch (e) {
        console.log(e)
    }
}

main()