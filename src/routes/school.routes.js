import {checkServer,listSchools,createSchool} from "../controllers/school.controllers.js";
import Router from "express"

export const schoolRouter = Router()

schoolRouter.route("/").get(checkServer)
schoolRouter.route("/getAllSchools").get(listSchools)
schoolRouter.route("/addSchool").post(createSchool)
