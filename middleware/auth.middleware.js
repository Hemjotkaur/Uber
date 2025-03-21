const jwt = require('jsonwebtoken');

const authUserMiddleware = (req,res,next) =>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        const token = (req.headers.authorization =
            req.headers.authorization.split(" ")[1]);

        if(!token) {
            return res.status(401).json({message : "Your are not authorized.. "});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message : "Invalid token.."});
        }
    }
    else{
        return res.status(401).json({message : "Your are not authorized.. "});
    }
}

const authCaptainMiddleware = (req,res,next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        const token = (req.headers.authorization =
            req.headers.authorization.split(" ")[1]);

        if(!token) {
            return res.status(401).json({message : "Your are not authorized.. "});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.captain = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message : "Invalid token.."});
        }
    }
    else{
        return res.status(401).json({message : "Your are not authorized.. "});
    }
}

module.exports = { 
    authUserMiddleware,
    authCaptainMiddleware
};