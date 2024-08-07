const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // If token is missing, send an unauthorized response
    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }

    // Verify token
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        // Attach the user from the token to the request object
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401);
        throw new Error("User is not authorized");
    }
});

module.exports = validateToken;
