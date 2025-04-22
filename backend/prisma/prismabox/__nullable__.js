"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__nullable__ = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__ = (schema) => typebox_1.Type.Union([typebox_1.Type.Null(), schema]);
exports.__nullable__ = __nullable__;
