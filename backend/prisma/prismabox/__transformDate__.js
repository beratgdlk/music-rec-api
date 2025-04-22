"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__transformDate__ = void 0;
const typebox_1 = require("@sinclair/typebox");
const __transformDate__ = (options) => typebox_1.Type.Transform(typebox_1.Type.String(Object.assign({ format: "date-time" }, options)))
    .Decode((value) => new Date(value))
    .Encode((value) => value.toISOString());
exports.__transformDate__ = __transformDate__;
