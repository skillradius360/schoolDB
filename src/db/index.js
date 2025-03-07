import mysql from "mysql2/promise";

async function connectDB(){

   try {
     const dbConnection  = await mysql.createConnection({
         host:"localhost",
         user:"root",
         password:"admin",
        //  port:"8080"
     })
     if(dbConnection) {
        console.log("connection success with db")
        return dbConnection
   }
   } catch (error) {
    console.error("some error occured connecting to the database",error)
   }
}


async function createDB(dbName){
   const db= await connectDB()
    if(!db) return;
   let xx= await db.execute(`show databases`)
   if(xx[0].some((data)=>data?.Database===dbName)){
      console.warn("database exists")
      console.log(xx)
      return;
   }
   else{
      await db.execute(`create database ${dbName}`)
      console.log("adada")
      console.log( await db.execute(`show databases`))
   }
   return db
}

createDB("pppd")

export default  connectDB