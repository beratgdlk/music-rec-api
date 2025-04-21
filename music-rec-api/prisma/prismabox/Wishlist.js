"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistInputUpdate = exports.WishlistInputCreate = exports.Wishlist = exports.WishlistOrderBy = exports.WishlistInclude = exports.WishlistSelect = exports.WishlistWhereUnique = exports.WishlistWhere = exports.WishlistRelationsInputUpdate = exports.WishlistRelationsInputCreate = exports.WishlistPlainInputUpdate = exports.WishlistPlainInputCreate = exports.WishlistRelations = exports.WishlistPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.WishlistPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    userId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    addedAt: typebox_1.Type.Date(),
});
exports.WishlistRelations = typebox_1.Type.Object({
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
    song: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        title: typebox_1.Type.String(),
        duration: typebox_1.Type.Integer(),
        trackNumber: typebox_1.Type.Integer(),
        audioUrl: typebox_1.Type.String(),
        rating: typebox_1.Type.Number(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        albumId: typebox_1.Type.Integer(),
        artistId: typebox_1.Type.Integer(),
    }),
});
exports.WishlistPlainInputCreate = typebox_1.Type.Object({
    addedAt: typebox_1.Type.Optional(typebox_1.Type.Date()),
});
exports.WishlistPlainInputUpdate = typebox_1.Type.Object({
    addedAt: typebox_1.Type.Optional(typebox_1.Type.Date()),
});
exports.WishlistRelationsInputCreate = typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    song: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
});
exports.WishlistRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    song: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
}));
exports.WishlistWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    userId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    addedAt: typebox_1.Type.Date(),
}, { additionalProperties: true }), { $id: "Wishlist" }));
exports.WishlistWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId_songId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            userId_songId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
        }),
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
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
    })),
], { additionalProperties: true }), { $id: "Wishlist" });
exports.WishlistSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    user: typebox_1.Type.Boolean(),
    userId: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    songId: typebox_1.Type.Boolean(),
    addedAt: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.WishlistInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.WishlistOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    userId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    songId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    addedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Wishlist = typebox_1.Type.Composite([exports.WishlistPlain, exports.WishlistRelations]);
exports.WishlistInputCreate = typebox_1.Type.Composite([
    exports.WishlistPlainInputCreate,
    exports.WishlistRelationsInputCreate,
]);
exports.WishlistInputUpdate = typebox_1.Type.Composite([
    exports.WishlistPlainInputUpdate,
    exports.WishlistRelationsInputUpdate,
]);
