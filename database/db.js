import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "n30" // o'zingizning baza nomingiz
});