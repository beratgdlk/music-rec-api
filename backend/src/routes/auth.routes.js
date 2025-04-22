"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = express_1.default.Router();
// User registration with validation
router.post('/register', (0, validation_middleware_1.validate)(auth_validator_1.registerValidation), auth_controller_1.register);
// User login with validation
router.post('/login', (0, validation_middleware_1.validate)(auth_validator_1.loginValidation), auth_controller_1.login);
// Refresh token
router.post('/refresh-token', auth_controller_1.refreshToken);
// Logout
router.post('/logout', auth_controller_1.logout);
// Get user profile - requires authentication
router.get('/profile', auth_middleware_1.authenticate, auth_controller_1.getProfile);
exports.default = router;
