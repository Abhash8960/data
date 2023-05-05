import {User} from "../modal/User.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
 
    try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: "login first" });
        }
        var decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id);
        next();
        
    } catch (error) {
        res.status(500).json({ message: "somthing went wrong1" });
    }
 
};