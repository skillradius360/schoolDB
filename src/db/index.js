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
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : null, // ✅ Fixes self-signed certificate issue
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
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : null, // ✅ Apply SSL if enabled
    });

    console.log(`✅ Successfully connected to MySQL database: ${dbName}`);

    // ✅ Create schools table if it does not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Schools table is ready!");

    return pool; 
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    throw error;
  }
}

export { initializeDatabase, pool };
