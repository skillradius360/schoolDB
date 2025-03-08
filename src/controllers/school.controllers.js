import { asyncHandler } from "../utils/asyncHandler.js";
import { initializeDatabase } from "../db/index.js";

let mainDb;

(async () => {
    mainDb = await initializeDatabase();
})();

const addSchool = async (name, address, latitude, longitude) => {
    const connection = await mainDb.getConnection();
    try {
        const [result] = await connection.query(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name, address, latitude, longitude]
        );
        return result;
    } finally {
        connection.release();
    }
};

const getAllSchools = async () => {
    const connection = await mainDb.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM schools");
        return rows;
    } finally {
        connection.release();
    }
};

const checkServer = asyncHandler(async (req, res) => {
    return res.status(200).json({ msg: "Server working fine" });
});

const createSchool = asyncHandler(async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    await addSchool(name, address, parseFloat(latitude), parseFloat(longitude));
    res.status(201).json({ message: "School added successfully" });
});

const listSchools = asyncHandler(async (req, res) => {
    let { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }
    
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    const schools = await getAllSchools();

    schools.sort((a, b) => {
        const distA = Math.hypot(a.latitude - latitude, a.longitude - longitude);
        const distB = Math.hypot(b.latitude - latitude, b.longitude - longitude);
        return distA - distB;
    });

    return res.status(200).json(schools);
});

export { checkServer, listSchools, createSchool };
