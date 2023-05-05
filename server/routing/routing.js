import express from "express";
import { register,login,userProfile,getuserProfile,deleteuserProfile,downloadImage} from "../controller/userController.js";
import {upload} from "../utlis/common.js";
import {authenticate} from "../middlewere/authoriz.js"


export const router  = express.Router()

router.post("/register" ,register)
router.post("/login" ,login)

router.post("/profile",authenticate,upload.single('file'),userProfile)

router.get("/get-profile",authenticate,getuserProfile)
router.post("/download",authenticate,downloadImage)

router.delete("/delete-profile/:id",authenticate,deleteuserProfile)
