const jwt = require('jsonwebtoken');
const JWT_SECRET = "MY_SECRET_KEY";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/loginForm');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Invalid token");
        return res.redirect('/loginForm');
    }
};

module.exports = authMiddleware;
