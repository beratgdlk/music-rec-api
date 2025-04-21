"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendation_controller_1 = require("../controllers/recommendation.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Kişiselleştirilmiş öneriler - kimlik doğrulama gerekiyor
router.get('/', auth_middleware_1.authenticate, recommendation_controller_1.getRecommendations);
// Popüler şarkılar - herkes erişebilir
router.get('/popular', recommendation_controller_1.getPopular);
exports.default = router;
