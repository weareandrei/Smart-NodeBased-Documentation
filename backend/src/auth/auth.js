import { DocumentationModel } from '../mongodb/model.js'

const validateUserCredentials = async (req, res) => {
    console.log('API Called - /validateUserCredentials')
    const { username, password } = req.body

    try {
        // const user = await DocumentationModel.find({});
        const user = {
            "_id": {
                "$oid": "652367f3e9a268c7fc1e6efa"
            },
            "username": "user",
            "password": "pass",
            "documentationId": "6523592fd730e1f9120fbef6"
        }
        console.log('Username:', username)
        console.log('User:', user)

        if (!user) {
            console.log('404, User not found')
            res.status(404).json({ message: 'User not found' })
            return;
        }

        if (user.password === password) {
            res.json(user)
            return
        }
        console.log('404, Wrong password')
        res.status(404).json({ message: 'Wrong password' })
    } catch (error) {
        console.log('500,', error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    validateUserCredentials,
}
