import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

async function initializeDatabase() {
  const dbName = process.env.DB_NAME || "schoolSchema";

  try {
    console.log(`🌍 Connecting to MySQL: ${process.env.DB_HOST}`);

    // ✅ Create a temporary connection to check DB server and create DB if needed
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "admin",
      ssl: {
        rejectUnauthorized: false, // ✅ Fixes self-signed certificate issue
      },
    });

    console.log(`📌 Checking if database '${dbName}' exists...`);
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await tempConnection.end();

    // ✅ Create the main connection pool
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "admin",
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false, // ✅ Fixes self-signed certificate issue
      },
    });

    console.log(`✅ Successfully connected to MySQL database: ${dbName}`);
    return pool;
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    throw error;
  }
}

export { initializeDatabase, pool };
