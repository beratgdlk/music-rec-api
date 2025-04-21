"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongInputUpdate = exports.SongInputCreate = exports.Song = exports.SongOrderBy = exports.SongInclude = exports.SongSelect = exports.SongWhereUnique = exports.SongWhere = exports.SongRelationsInputUpdate = exports.SongRelationsInputCreate = exports.SongPlainInputUpdate = exports.SongPlainInputCreate = exports.SongRelations = exports.SongPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.SongPlain = typebox_1.Type.Object({
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
});
exports.SongRelations = typebox_1.Type.Object({
    album: typebox_1.Type.Object({
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
    }),
    artist: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        name: typebox_1.Type.String(),
        bio: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        country: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    }),
    likedBy: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        likedAt: typebox_1.Type.Date(),
    }), { additionalProperties: true }),
    playlists: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        playlistId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
        order: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
    reviews: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        content: typebox_1.Type.String(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        userId: typebox_1.Type.Integer(),
        songId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
        albumId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
    }), { additionalProperties: true }),
    ratings: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        score: typebox_1.Type.Integer(),
        createdAt: typebox_1.Type.Date(),
        userId: typebox_1.Type.Integer(),
        songId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
        albumId: (0, __nullable__1.__nullable__)(typebox_1.Type.Integer()),
    }), { additionalProperties: true }),
    wishlist: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
    }), { additionalProperties: true }),
});
exports.SongPlainInputCreate = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    duration: typebox_1.Type.Integer(),
    trackNumber: typebox_1.Type.Integer(),
    audioUrl: typebox_1.Type.String(),
    rating: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.SongPlainInputUpdate = typebox_1.Type.Object({
    title: typebox_1.Type.Optional(typebox_1.Type.String()),
    duration: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    trackNumber: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    audioUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    rating: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.SongRelationsInputCreate = typebox_1.Type.Object({
    album: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    artist: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    likedBy: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    playlists: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    reviews: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    ratings: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    wishlist: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
});
exports.SongRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    album: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    artist: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    likedBy: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    playlists: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    reviews: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    ratings: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    wishlist: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
}));
exports.SongWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    title: typebox_1.Type.String(),
    duration: typebox_1.Type.Integer(),
    trackNumber: typebox_1.Type.Integer(),
    audioUrl: typebox_1.Type.String(),
    rating: typebox_1.Type.Number(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
    albumId: typebox_1.Type.Integer(),
    artistId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "Song" }));
exports.SongWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
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
], { additionalProperties: true }), { $id: "Song" });
exports.SongSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    title: typebox_1.Type.Boolean(),
    duration: typebox_1.Type.Boolean(),
    trackNumber: typebox_1.Type.Boolean(),
    audioUrl: typebox_1.Type.Boolean(),
    rating: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    albumId: typebox_1.Type.Boolean(),
    artist: typebox_1.Type.Boolean(),
    artistId: typebox_1.Type.Boolean(),
    likedBy: typebox_1.Type.Boolean(),
    playlists: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    wishlist: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.SongInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    album: typebox_1.Type.Boolean(),
    artist: typebox_1.Type.Boolean(),
    likedBy: typebox_1.Type.Boolean(),
    playlists: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    wishlist: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.SongOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    title: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    duration: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    trackNumber: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    audioUrl: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    rating: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    albumId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    artistId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Song = typebox_1.Type.Composite([exports.SongPlain, exports.SongRelations]);
exports.SongInputCreate = typebox_1.Type.Composite([
    exports.SongPlainInputCreate,
    exports.SongRelationsInputCreate,
]);
exports.SongInputUpdate = typebox_1.Type.Composite([
    exports.SongPlainInputUpdate,
    exports.SongRelationsInputUpdate,
]);
