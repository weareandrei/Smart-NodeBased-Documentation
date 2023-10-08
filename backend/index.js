// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { loginUser } = require('./auth/auth')

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());

app.post('/userCredentialsValidate', loginUser)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
