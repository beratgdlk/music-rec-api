"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingInputUpdate = exports.RatingInputCreate = exports.Rating = exports.RatingOrderBy = exports.RatingInclude = exports.RatingSelect = exports.RatingWhereUnique = exports.RatingWhere = exports.RatingRelationsInputUpdate = exports.RatingRelationsInputCreate = exports.RatingPlainInputUpdate = exports.RatingPlainInputCreate = exports.RatingRelations = exports.RatingPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.RatingPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    score: typebox_1.Type.Integer(),
    createdAt: typebox_1.Type.Date(),
    userId: typebox_1.Type.Integer(),
    songId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
    albumId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
});
exports.RatingRelations = typebox_1.Type.Object({
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
exports.RatingPlainInputCreate = typebox_1.Type.Object({ score: typebox_1.Type.Integer() });
exports.RatingPlainInputUpdate = typebox_1.Type.Object({
    score: typebox_1.Type.Optional(typebox_1.Type.Integer()),
});
exports.RatingRelationsInputCreate = typebox_1.Type.Object({
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
exports.RatingRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
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
exports.RatingWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    score: typebox_1.Type.Integer(),
    createdAt: typebox_1.Type.Date(),
    userId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    albumId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "Rating" }));
exports.RatingWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
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
        score: typebox_1.Type.Integer(),
        createdAt: typebox_1.Type.Date(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        albumId: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "Rating" });
exports.RatingSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    score: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    user: typebox_1.Type.Boolean(),
    userId: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    songId: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    albumId: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.RatingInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.RatingOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    score: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
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
exports.Rating = typebox_1.Type.Composite([exports.RatingPlain, exports.RatingRelations]);
exports.RatingInputCreate = typebox_1.Type.Composite([
    exports.RatingPlainInputCreate,
    exports.RatingRelationsInputCreate,
]);
exports.RatingInputUpdate = typebox_1.Type.Composite([
    exports.RatingPlainInputUpdate,
    exports.RatingRelationsInputUpdate,
]);
