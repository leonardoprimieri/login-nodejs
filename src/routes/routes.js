const express = require("express");
const router = express.Router();
const homeController = require("../app/controllers/homeController");
const userController = require("../app/controllers/userController");

router.get("/", homeController.getAllUsers);

router.get("/user/profile", userController.profile);

router.get("/user/login", userController.login);
router.post("/user/login", userController.loginAction);
router.get("/user/logout", userController.logout);

router.get("/user/register", userController.register);
router.post("/user/register", userController.registerAction);

module.exports = router;
