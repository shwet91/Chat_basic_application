import jwt from "jsonwebtoken"
import { Request , Response , NextFunction } from "express";




const authMiddleware = (req: Request , res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("this is auth test :" , authHeader)
    if(authHeader === null || authHeader === undefined) {
        return res.status(401).json({status: 401, message: "UnAuthorized"})
    }
    const token = authHeader.split(" ")[1];

    // * verify the jwt token

    jwt.verify(token , process.env.JWT_SECRET, (err , user) => {
        if(err)
            return res.status(401).json({ status: 401, message: "UnAuthorized" })
        req.user = user as AuthUser;
        next();
    })
}

export default authMiddleware;