"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenInputUpdate = exports.RefreshTokenInputCreate = exports.RefreshToken = exports.RefreshTokenOrderBy = exports.RefreshTokenInclude = exports.RefreshTokenSelect = exports.RefreshTokenWhereUnique = exports.RefreshTokenWhere = exports.RefreshTokenRelationsInputUpdate = exports.RefreshTokenRelationsInputCreate = exports.RefreshTokenPlainInputUpdate = exports.RefreshTokenPlainInputCreate = exports.RefreshTokenRelations = exports.RefreshTokenPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.RefreshTokenPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    token: typebox_1.Type.String(),
    userId: typebox_1.Type.Integer(),
    expiresAt: typebox_1.Type.Date(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    revoked: typebox_1.Type.Boolean(),
});
exports.RefreshTokenRelations = typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        email: typebox_1.Type.String(),
        username: typebox_1.Type.String(),
        password: typebox_1.Type.String(),
        name: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        isAdmin: typebox_1.Type.Boolean(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    }),
});
exports.RefreshTokenPlainInputCreate = typebox_1.Type.Object({
    token: typebox_1.Type.String(),
    expiresAt: typebox_1.Type.Date(),
    revoked: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.RefreshTokenPlainInputUpdate = typebox_1.Type.Object({
    token: typebox_1.Type.Optional(typebox_1.Type.String()),
    expiresAt: typebox_1.Type.Optional(typebox_1.Type.Date()),
    revoked: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.RefreshTokenRelationsInputCreate = typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
});
exports.RefreshTokenRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
}));
exports.RefreshTokenWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
    AND: typebox_1.Type.Union([
        Self,
        typebox_1.Type.Array(Self, { additionalProperties: true }),
    ]),
    NOT: typebox_1.Type.Union([
        Self,
        typebox_1.Type.Array(Self, { additionalProperties: true }),
    ]),
    OR: typebox_1.Type.Array(Self, { additionalProperties: true }),
    id: typebox_1.Type.Integer(),
    token: typebox_1.Type.String(),
    userId: typebox_1.Type.Integer(),
    expiresAt: typebox_1.Type.Date(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    revoked: typebox_1.Type.Boolean(),
}, { additionalProperties: true }), { $id: "RefreshToken" }));
exports.RefreshTokenWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({ id: typebox_1.Type.Integer(), token: typebox_1.Type.String() }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({ token: typebox_1.Type.String() }),
    ], { additionalProperties: true }),
    typebox_1.Type.Partial(typebox_1.Type.Object({
        AND: typebox_1.Type.Union([
            Self,
            typebox_1.Type.Array(Self, { additionalProperties: true }),
        ]),
        NOT: typebox_1.Type.Union([
            Self,
            typebox_1.Type.Array(Self, { additionalProperties: true }),
        ]),
        OR: typebox_1.Type.Array(Self, { additionalProperties: true }),
    }), { additionalProperties: true }),
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        token: typebox_1.Type.String(),
        userId: typebox_1.Type.Integer(),
        expiresAt: typebox_1.Type.Date(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        revoked: typebox_1.Type.Boolean(),
    })),
], { additionalProperties: true }), { $id: "RefreshToken" });
exports.RefreshTokenSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    token: typebox_1.Type.Boolean(),
    userId: typebox_1.Type.Boolean(),
    user: typebox_1.Type.Boolean(),
    expiresAt: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    revoked: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.RefreshTokenInclude = typebox_1.Type.Partial(typebox_1.Type.Object({ user: typebox_1.Type.Boolean(), _count: typebox_1.Type.Boolean() }));
exports.RefreshTokenOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    token: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    userId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    expiresAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    revoked: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.RefreshToken = typebox_1.Type.Composite([
    exports.RefreshTokenPlain,
    exports.RefreshTokenRelations,
]);
exports.RefreshTokenInputCreate = typebox_1.Type.Composite([
    exports.RefreshTokenPlainInputCreate,
    exports.RefreshTokenRelationsInputCreate,
]);
exports.RefreshTokenInputUpdate = typebox_1.Type.Composite([
    exports.RefreshTokenPlainInputUpdate,
    exports.RefreshTokenRelationsInputUpdate,
]);
