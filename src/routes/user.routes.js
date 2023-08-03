import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import {verifyToken, isAdmin} from "../middlewares/authJwt.js"
import {checkRoleExisted} from "../middlewares/verifySignup.js"

const router = Router()

router.post('/', [
    verifyToken,
    isAdmin,
    checkRoleExisted
],createUser)

export default router