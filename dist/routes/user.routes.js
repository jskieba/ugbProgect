"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/list", userController_1.userList);
router.route("/")
    .get(userController_1.selfInfoUser)
    .patch(userController_1.updateUser)
    .delete(userController_1.deleteUser);
router.route("/:userId")
    .get(userController_1.userDetail)
    .patch(userController_1.updateUser)
    .delete(userController_1.deleteUser);
exports.default = router;
