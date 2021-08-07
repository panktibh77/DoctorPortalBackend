require('dotenv').config();
const app = require('./app').default;
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, 1023, () => console.log(`API is running on port ${port}...`));