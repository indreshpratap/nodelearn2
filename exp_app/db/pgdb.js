const {
    Pool
} = require('pg');

let pool;

module.exports = {
    pgdbConnect: pgConnect,
    pgQuery:runQuery
}

function pgConnect() {
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'tracking',
        password: '12345',
        port: 5432
    });
}

function runQuery(query, callback) {
    pool.query(query, (err, res) => {
        callback(err, res);
    })
}