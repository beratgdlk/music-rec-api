"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongPlaylistInputUpdate = exports.SongPlaylistInputCreate = exports.SongPlaylist = exports.SongPlaylistOrderBy = exports.SongPlaylistInclude = exports.SongPlaylistSelect = exports.SongPlaylistWhereUnique = exports.SongPlaylistWhere = exports.SongPlaylistRelationsInputUpdate = exports.SongPlaylistRelationsInputCreate = exports.SongPlaylistPlainInputUpdate = exports.SongPlaylistPlainInputCreate = exports.SongPlaylistRelations = exports.SongPlaylistPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.SongPlaylistPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    playlistId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    addedAt: typebox_1.Type.Date(),
    order: typebox_1.Type.Integer(),
});
exports.SongPlaylistRelations = typebox_1.Type.Object({
    playlist: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        name: typebox_1.Type.String(),
        description: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        coverImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        isPublic: typebox_1.Type.Boolean(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        ownerId: typebox_1.Type.Integer(),
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
exports.SongPlaylistPlainInputCreate = typebox_1.Type.Object({
    addedAt: typebox_1.Type.Optional(typebox_1.Type.Date()),
    order: typebox_1.Type.Integer(),
});
exports.SongPlaylistPlainInputUpdate = typebox_1.Type.Object({
    addedAt: typebox_1.Type.Optional(typebox_1.Type.Date()),
    order: typebox_1.Type.Optional(typebox_1.Type.Integer()),
});
exports.SongPlaylistRelationsInputCreate = typebox_1.Type.Object({
    playlist: typebox_1.Type.Object({
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
exports.SongPlaylistRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    playlist: typebox_1.Type.Object({
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
exports.SongPlaylistWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    playlistId: typebox_1.Type.Integer(),
    songId: typebox_1.Type.Integer(),
    addedAt: typebox_1.Type.Date(),
    order: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "SongPlaylist" }));
exports.SongPlaylistWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        playlistId_songId: typebox_1.Type.Object({ playlistId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            playlistId_songId: typebox_1.Type.Object({ playlistId: typebox_1.Type.Integer(), songId: typebox_1.Type.Integer() }, { additionalProperties: true }),
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
        playlistId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
        order: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "SongPlaylist" });
exports.SongPlaylistSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    playlist: typebox_1.Type.Boolean(),
    playlistId: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    songId: typebox_1.Type.Boolean(),
    addedAt: typebox_1.Type.Boolean(),
    order: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.SongPlaylistInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    playlist: typebox_1.Type.Boolean(),
    song: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.SongPlaylistOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    playlistId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    songId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    addedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    order: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.SongPlaylist = typebox_1.Type.Composite([
    exports.SongPlaylistPlain,
    exports.SongPlaylistRelations,
]);
exports.SongPlaylistInputCreate = typebox_1.Type.Composite([
    exports.SongPlaylistPlainInputCreate,
    exports.SongPlaylistRelationsInputCreate,
]);
exports.SongPlaylistInputUpdate = typebox_1.Type.Composite([
    exports.SongPlaylistPlainInputUpdate,
    exports.SongPlaylistRelationsInputUpdate,
]);
