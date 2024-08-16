import { Router } from "express";
import { logout, signin, signUp, verifyCode, verifyEmail } from "../controllers/auth.controller.js";
// import { assertUniqueEmail } from "../middlewares/auth.middleware.js";
// import { signinSchema, signupSchema } from "../middlewares/auth.validate.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { GetProfile } from "../../User/Controllers/userprofile.controller.js";

const router=Router()

// router.post('/signin',validate(signinSchema),signin)
// router.post('/signup',validate(signupSchema),assertUniqueEmail,signup)
router.post('/signin',signin)

router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/verifyCode',verifyCode)


// router.post('/logout',logout)
// router.get('/profile',authenticate,GetProfile)
// router.post('/refresh',refreshToken)

export default router