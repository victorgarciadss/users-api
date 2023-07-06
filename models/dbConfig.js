import sql from "mssql";

import dotenv from "dotenv";
dotenv.config();

const config = {
    server: process.env.DB_SERVER, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    trustServerCertificate: true
};

export async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.log(err);
    }
}




