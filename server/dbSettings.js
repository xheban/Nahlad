const { Pool } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
const credentials = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "admin",
    port: 5432,
};

const pool = new Pool(credentials);

module.exports = pool;
