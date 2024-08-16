import { Router } from "express";
import { authenticate, authorize, checkBlacklist } from "../../Auth/middlewares/auth.middleware.js";
import { createBooking, getUserBookings } from "../Controllers/Booking.Controller.js";


const router = Router()






router.post(('/:id'),
    authenticate,
    checkBlacklist,
    authorize("USER"),
    createBooking
)

router.get(('/'),
    authenticate,
    checkBlacklist,
    authorize("USER"),
    getUserBookings
    
)



export default router