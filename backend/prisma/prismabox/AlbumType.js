"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumType = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.AlbumType = typebox_1.Type.Union([
    typebox_1.Type.Literal("ALBUM"),
    typebox_1.Type.Literal("SINGLE"),
    typebox_1.Type.Literal("EP"),
]);
