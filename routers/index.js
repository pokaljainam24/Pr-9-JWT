const { Router } = require("express");

const mainRoutes = Router();

const adminRoutes = require("./adminroutes");
mainRoutes.use(adminRoutes);

module.exports = mainRoutes;