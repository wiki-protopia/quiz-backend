const jwt = require("jsonwebtoken")

export const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).josn({error: "Token not found"})
    }
    // extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).json({error: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.exp <= Date.now() / 1000) {
            return res.status(401).json({ error: "Token expired" });
        }

        req.user = decoded
        next()
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({error: "Invalid Token"})
    }
}

// function to generate JWT TOKEN

export const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000})
}

