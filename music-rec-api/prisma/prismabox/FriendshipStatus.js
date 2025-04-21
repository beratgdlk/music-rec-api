"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipStatus = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.FriendshipStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("PENDING"),
    typebox_1.Type.Literal("ACCEPTED"),
    typebox_1.Type.Literal("BLOCKED"),
]);
