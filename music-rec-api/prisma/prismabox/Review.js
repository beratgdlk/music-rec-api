"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewInputUpdate = exports.ReviewInputCreate = exports.Review = exports.ReviewOrderBy = exports.ReviewInclude = exports.ReviewSelect = exports.ReviewWhereUnique = exports.ReviewWhere = exports.ReviewRelationsInputUpdate = exports.ReviewRelationsInputCreate = exports.ReviewPlainInputUpdate = exports.ReviewPlainInputCreate = exports.ReviewRelations = exports.ReviewPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.ReviewPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    content: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    userId: typebox_1.Type.Integer(),
    songId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
    albumId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
});
exports.ReviewRelations = typebox_1.Type.Object({
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
    song: (0, __nullable__1.__nullable__)(typebox_1.Type.Object({
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
    })),
    album: (0, __nullable__1.__nullable__)(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        title: typebox_1.Type.String(),
        coverImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        releaseYear: typebox_1.Type.Integer(),
        type: typebox_1.Type.Union([
            typebox_1.Type.Literal("ALBUM"),
            typebox_1.Type.Literal("SINGLE"),
            typebox_1.Type.Literal("EP"),
        ]),
        rating: typebox_1.Type.Number(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        artistId: typebox_1.Type.Integer(),
    })),
});
exports.ReviewPlainInputCreate = typebox_1.Type.Object({ content: typebox_1.Type.String() });
exports.ReviewPlainInputUpdate = typebox_1.Type.Object({
    content: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.ReviewRelationsInputCreate = typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    song: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    })),
    album: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    })),
});
exports.ReviewRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    song: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
        disconnect: typebox_1.Type.Boolean(),
    })),
    album: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
        disconnect: typebox_1.Type.Boolean(),
    })),
}));
exports.ReviewWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    content: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    userId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    albumId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "Review" }));
exports.ReviewWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId_songId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
        userId_albumId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), albumId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            userId_songId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
        }),
        typebox_1.Type.Object({
            userId_albumId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), albumId: typebox_1.Type.Integer() }, { additionalProperties: true }),
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
        content: typebox_1.Type.String(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        albumId: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "Review" });
exports.ReviewSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    content: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    user: typebox_1.Type.Boolean(),
    userId: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    songId: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    albumId: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ReviewInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ReviewOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    content: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    userId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    songId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    albumId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Review = typebox_1.Type.Composite([exports.ReviewPlain, exports.ReviewRelations]);
exports.ReviewInputCreate = typebox_1.Type.Composite([
    exports.ReviewPlainInputCreate,
    exports.ReviewRelationsInputCreate,
]);
exports.ReviewInputUpdate = typebox_1.Type.Composite([
    exports.ReviewPlainInputUpdate,
    exports.ReviewRelationsInputUpdate,
]);
