export async function createTable(name){
try {
    return await connection.execute(`
            CREATE TABLE IF NOT EXISTS ${name} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);
} catch (error) {
    console.error("some error  occured while creating a table  ",error)
}

}


