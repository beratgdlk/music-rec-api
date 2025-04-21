"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumInputUpdate = exports.AlbumInputCreate = exports.Album = exports.AlbumOrderBy = exports.AlbumInclude = exports.AlbumSelect = exports.AlbumWhereUnique = exports.AlbumWhere = exports.AlbumRelationsInputUpdate = exports.AlbumRelationsInputCreate = exports.AlbumPlainInputUpdate = exports.AlbumPlainInputCreate = exports.AlbumRelations = exports.AlbumPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.AlbumPlain = typebox_1.Type.Object({
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
});
exports.AlbumRelations = typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        name: typebox_1.Type.String(),
        bio: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        country: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    }),
    songs: typebox_1.Type.Array(typebox_1.Type.Object({
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
    }), { additionalProperties: true }),
    genres: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        albumId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
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
});
exports.AlbumPlainInputCreate = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    coverImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    releaseYear: typebox_1.Type.Integer(),
    type: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("ALBUM"),
        typebox_1.Type.Literal("SINGLE"),
        typebox_1.Type.Literal("EP"),
    ])),
    rating: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.AlbumPlainInputUpdate = typebox_1.Type.Object({
    title: typebox_1.Type.Optional(typebox_1.Type.String()),
    coverImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    releaseYear: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    type: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("ALBUM"),
        typebox_1.Type.Literal("SINGLE"),
        typebox_1.Type.Literal("EP"),
    ])),
    rating: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.AlbumRelationsInputCreate = typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    songs: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    genres: typebox_1.Type.Optional(typebox_1.Type.Object({
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
});
exports.AlbumRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
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
    genres: typebox_1.Type.Partial(typebox_1.Type.Object({
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
}));
exports.AlbumWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    coverImage: typebox_1.Type.String(),
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
}, { additionalProperties: true }), { $id: "Album" }));
exports.AlbumWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
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
        coverImage: typebox_1.Type.String(),
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
], { additionalProperties: true }), { $id: "Album" });
exports.AlbumSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    title: typebox_1.Type.Boolean(),
    coverImage: typebox_1.Type.Boolean(),
    releaseYear: typebox_1.Type.Boolean(),
    type: typebox_1.Type.Boolean(),
    rating: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    artist: typebox_1.Type.Boolean(),
    artistId: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    genres: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.AlbumInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    type: typebox_1.Type.Boolean(),
    artist: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    genres: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.AlbumOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    title: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    coverImage: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    releaseYear: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
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
    artistId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Album = typebox_1.Type.Composite([exports.AlbumPlain, exports.AlbumRelations]);
exports.AlbumInputCreate = typebox_1.Type.Composite([
    exports.AlbumPlainInputCreate,
    exports.AlbumRelationsInputCreate,
]);
exports.AlbumInputUpdate = typebox_1.Type.Composite([
    exports.AlbumPlainInputUpdate,
    exports.AlbumRelationsInputUpdate,
]);
