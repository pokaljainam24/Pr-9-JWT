const { Router } = require("express");
const adminRoutes = Router();
const AdminController = require("../controllers/admincontroller");
const authMiddleware = require('../middleware/JwtAuthMiddleware');

adminRoutes.get('/registerForm', AdminController.openregisterPage);
adminRoutes.post('/registerForm', AdminController.registerUser);

adminRoutes.get('/loginForm', AdminController.openLoginPage);
adminRoutes.post('/loginForm', AdminController.loginUser);

adminRoutes.get('/clearCookie', AdminController.clearCookieData);

adminRoutes.get('/', authMiddleware, AdminController.openHomePage);

adminRoutes.get('/about', authMiddleware, AdminController.openaboutPage);
adminRoutes.get('/contact', authMiddleware, AdminController.openContactPage);
adminRoutes.get('/service', authMiddleware, AdminController.openServicesPage);
adminRoutes.get('/booking', authMiddleware, AdminController.openBookingPage);
adminRoutes.get('/team', authMiddleware, AdminController.openTeamPage);
adminRoutes.get('/testimonial', authMiddleware, AdminController.openTestimonialPage);
adminRoutes.get('/404', authMiddleware, AdminController.openErrorPage);

module.exports = adminRoutes;
