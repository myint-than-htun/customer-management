
import mysql from "mysql2/promise";
import { appProperties } from "../configs/properties.js";

const pool = mysql.createPool(appProperties.mysqlDB);

export async function query(sql, params) {
    const connection = await pool.getConnection();
    try {
        const [rows, fields] = await connection.execute(sql, params);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

