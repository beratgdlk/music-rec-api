"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Get all users - admin only
router.get('/', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, user_controller_1.getUsers);
// Get user by ID - authenticated
router.get('/:id', auth_middleware_1.authenticate, user_controller_1.getUserById);
// Update user - own profile or admin
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.authorizeUser, user_controller_1.updateUser);
// Delete user - own profile or admin
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.authorizeUser, user_controller_1.deleteUser);
exports.default = router;
