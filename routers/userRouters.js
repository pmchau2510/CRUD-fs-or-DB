const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
router.get("/read-all", userController.getUsers);
router.get("/read", userController.getUserById);
router.get("/search", userController.searchUser);
router.post("/add", userController.createUser);
router.delete("/delete/:id", userController.deleteUser);
router.put("/edit/:id", userController.updateUser);
module.exports = router;