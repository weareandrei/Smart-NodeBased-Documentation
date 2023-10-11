const {mongoose} = require('mongoose');

const main = async () => {
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    try {
        mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Database Connected');
            })
            .catch((error) => {
                console.error('Database Connection Error:', error);
            });

        mongoose.set("strictQuery", false);

        const Schema = mongoose.Schema

        const UserModelSchema = new Schema({
            documentationId : {
                type: String
            },
            password : {
                type: String
            },
            username : {
                type: String
            }
        })

        const UserModel = mongoose.model("User", UserModelSchema, 'User')

        const result = await UserModel.findOne({username: 'user'});

        if (result) {
            console.log('Retrieved document:', result);
        } else {
            console.log('Document not found');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed');
    }
}

main()