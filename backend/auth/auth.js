const {MongoClient,ServerApiVersion} = require('mongodb');

const loginUser = async (req, res) => {
    // const user = req.body
    await main()

    res.status(200).json({ success: true })
}

const main = async () => {
    const uri = "mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const listDatabases = async(client) => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


module.exports = {
    loginUser,
};
