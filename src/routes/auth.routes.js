import { Router } from "express";

import { signin, signup } from "../controllers/auth.controller.js";
import { checkRoleExisted, checkDuplicateUserNameOrEmail } from "../middlewares/verifySignup.js";

const router = Router()

router.post('/signin', signin)
router.post('/signup', [checkDuplicateUserNameOrEmail, checkRoleExisted] ,signup)

export default router