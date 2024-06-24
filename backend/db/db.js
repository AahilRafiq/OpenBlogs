import mysql from 'mysql2/promise'

// Establish connection to database
export const db = mysql.createPool({
    uri: process.env.MYSQL_URI,
    ssl:{
        ca: process.env.MYSQL_SSL_CERT,
        rejectUnauthorized: false // Accept self-signed certificates
    },
    waitForConnections: true,
    maxIdle: 20
})