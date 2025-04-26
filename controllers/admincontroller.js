const User = require("../model/adminSchema");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "MY_SECRET_KEY";

module.exports.openregisterPage = (req, res) => {
    return res.render("admin/registerForm");
};

module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userInDb = await User.findOne({ email: email.toLowerCase() });

        if (userInDb) {
            console.log("User already exists");
            return res.redirect("/registerForm");
        }

        await User.create({ username, email: email.toLowerCase(), password });
        console.log("User registered successfully");
        return res.redirect("/loginForm");
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.openLoginPage = (req, res) => {
    return res.render("admin/loginForm");
};

module.exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });

        if (user) {
            if (user.password === req.body.password) {
                const payload = {
                    id: user._id,
                    username: user.username,
                    role: "user"
                };

                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

                res.cookie('token', token);
                console.log("Login successful");
                return res.redirect('/');
            } else {
                console.log("Password mismatch");
                return res.redirect('/loginForm');
            }
        } else {
            console.log("User not found");
            return res.redirect('/loginForm');
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.clearCookieData = (req, res) => {
    res.clearCookie('token');
    return res.redirect('/loginForm');
};

module.exports.openHomePage = (req, res) => {
    return res.render("homepage");
};

module.exports.openaboutPage = (req, res) => {
    return res.render("about");
}

module.exports.openContactPage = (req, res) => {
    return res.render("contact");
};

module.exports.openServicesPage = (req, res) => {
    return res.render("service");
}

module.exports.openBookingPage = (req, res) => {
    return res.render("booking");
}

module.exports.openTeamPage = (req, res) => {
    return res.render("team");
}

module.exports.openTestimonialPage = (req, res) => {
    return res.render("testimonial");
}

module.exports.openErrorPage = (req, res) => {
    return res.render("404");
}