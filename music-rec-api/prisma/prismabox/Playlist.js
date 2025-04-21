"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistInputUpdate = exports.PlaylistInputCreate = exports.Playlist = exports.PlaylistOrderBy = exports.PlaylistInclude = exports.PlaylistSelect = exports.PlaylistWhereUnique = exports.PlaylistWhere = exports.PlaylistRelationsInputUpdate = exports.PlaylistRelationsInputCreate = exports.PlaylistPlainInputUpdate = exports.PlaylistPlainInputCreate = exports.PlaylistRelations = exports.PlaylistPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.PlaylistPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    name: typebox_1.Type.String(),
    description: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    coverImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    isPublic: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    ownerId: typebox_1.Type.Integer(),
});
exports.PlaylistRelations = typebox_1.Type.Object({
    owner: typebox_1.Type.Object({
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
    songs: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        playlistId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
        order: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
});
exports.PlaylistPlainInputCreate = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    coverImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.PlaylistPlainInputUpdate = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    coverImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    isPublic: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.PlaylistRelationsInputCreate = typebox_1.Type.Object({
    owner: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    songs: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
});
exports.PlaylistRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    owner: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    songs: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
}));
exports.PlaylistWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    coverImage: typebox_1.Type.String(),
    isPublic: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    ownerId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "Playlist" }));
exports.PlaylistWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({ id: typebox_1.Type.Integer() }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([typebox_1.Type.Object({ id: typebox_1.Type.Integer() })], {
        additionalProperties: true,
    }),
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
        name: typebox_1.Type.String(),
        description: typebox_1.Type.String(),
        coverImage: typebox_1.Type.String(),
        isPublic: typebox_1.Type.Boolean(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        ownerId: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "Playlist" });
exports.PlaylistSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    name: typebox_1.Type.Boolean(),
    description: typebox_1.Type.Boolean(),
    coverImage: typebox_1.Type.Boolean(),
    isPublic: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    owner: typebox_1.Type.Boolean(),
    ownerId: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.PlaylistInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    owner: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.PlaylistOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    name: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    description: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    coverImage: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    isPublic: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    ownerId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Playlist = typebox_1.Type.Composite([exports.PlaylistPlain, exports.PlaylistRelations]);
exports.PlaylistInputCreate = typebox_1.Type.Composite([
    exports.PlaylistPlainInputCreate,
    exports.PlaylistRelationsInputCreate,
]);
exports.PlaylistInputUpdate = typebox_1.Type.Composite([
    exports.PlaylistPlainInputUpdate,
    exports.PlaylistRelationsInputUpdate,
]);
