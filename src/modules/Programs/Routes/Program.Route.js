import { Router } from "express";
import { authenticate, authorize, checkBlacklist } from "../../Auth/middlewares/auth.middleware.js";
import { } from "../Controllers/Task.Controller.js";
import { upload } from "../../../MiddleWares/Upload.middleware.js";
import { CreateProgram, DeleteProgram, getAllProgramsSorted, UpdateProgram } from "../Controllers/Program.Controller.js";

const router=Router()






router.post(('/'),authenticate,authorize(),checkBlacklist,upload.single("image"),CreateProgram)
router.get(('/sorted'),authenticate,authorize(),checkBlacklist,getAllProgramsSorted)
router.put(('/:id'),authenticate,authorize(),checkBlacklist,UpdateProgram)

router.delete(('/:id'),authenticate,authorize(),checkBlacklist,DeleteProgram)

export default router