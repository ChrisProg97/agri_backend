const fs = require('fs');
const pgp = require('pg-promise')();

const connectionString = process.env.PG_CONNECTION_STRING;

if (!connectionString) {
    throw new Error('PG_CONNECTION_STRING is not set in the environment variables');
}

const sslConfig = {
    ssl: {
        rejectUnauthorized: true, // Make sure the certificate is verified
        ca: fs.readFileSync('./ca.pem').toString() // Read and include the certificate
    }
};

const db = pgp({
    connectionString: connectionString
});

module.exports = db;
