import dotenv from 'dotenv';
dotenv.config();

export const appProperties = {

    /* mysql db */
    mysqlDB: {
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME
    }

};