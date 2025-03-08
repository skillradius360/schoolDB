# API Documentation for School Management System

## Base URL
```
https://your-api-url.com/school
```

## Endpoints

### 1️⃣ **Check Server Status**
**GET /**
- **Description:** Checks if the server is running.
- **Example Request:**
  ```bash
  curl -X GET https://schooldb-kzfe.onrender.com/school/
  ```
- **Response:**
  ```json
  {
    "msg": "Server working fine"
  }
  ```

---

### 2️⃣ **Get All Schools**
**GET /getAllSchools**
- **Description:** Retrieves a list of all registered schools.
- **Example Request:**
  ```bash
  curl -X GET https://schooldb-kzfe.onrender.com/school/getAllSchools
  ```
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "ABC High School",
      "address": "123 Street, City",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "created_at": "2025-03-08T12:00:00Z"
    }
  ]
  ```

---

### 3️⃣ **Add a New School**
**POST /addSchool**
- **Description:** Adds a new school to the database.
- **Request Body:** (JSON)
  ```json
  {
    "name": "XYZ Academy",
    "address": "456 Main Road, City",
    "latitude": 40.7306,
    "longitude": -73.9352
  }
  ```
- **Example Request:**
  ```bash
  curl -X POST https://schooldb-kzfe.onrender.com/school/addSchool 
       -H "Content-Type: application/json" \
       -d '{"name": "XYZ Academy", "address": "456 Main Road, City", "latitude": 40.7306, "longitude": -73.9352}'
  ```
- **Response:**
  ```json
  {
    "message": "School added successfully"
  }
  ```

---

