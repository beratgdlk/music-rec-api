"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistInputUpdate = exports.ArtistInputCreate = exports.Artist = exports.ArtistOrderBy = exports.ArtistInclude = exports.ArtistSelect = exports.ArtistWhereUnique = exports.ArtistWhere = exports.ArtistRelationsInputUpdate = exports.ArtistRelationsInputCreate = exports.ArtistPlainInputUpdate = exports.ArtistPlainInputCreate = exports.ArtistRelations = exports.ArtistPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.ArtistPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    name: typebox_1.Type.String(),
    bio: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    country: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
});
exports.ArtistRelations = typebox_1.Type.Object({
    albums: typebox_1.Type.Array(typebox_1.Type.Object({
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
    }), { additionalProperties: true }),
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
        artistId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
});
exports.ArtistPlainInputCreate = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    bio: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    profileImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    country: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
});
exports.ArtistPlainInputUpdate = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    bio: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    profileImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    country: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
});
exports.ArtistRelationsInputCreate = typebox_1.Type.Object({
    albums: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
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
});
exports.ArtistRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    albums: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
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
}));
exports.ArtistWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    bio: typebox_1.Type.String(),
    profileImage: typebox_1.Type.String(),
    country: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
}, { additionalProperties: true }), { $id: "Artist" }));
exports.ArtistWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
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
        bio: typebox_1.Type.String(),
        profileImage: typebox_1.Type.String(),
        country: typebox_1.Type.String(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    })),
], { additionalProperties: true }), { $id: "Artist" });
exports.ArtistSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    name: typebox_1.Type.Boolean(),
    bio: typebox_1.Type.Boolean(),
    profileImage: typebox_1.Type.Boolean(),
    country: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    albums: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    genres: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ArtistInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    albums: typebox_1.Type.Boolean(),
    songs: typebox_1.Type.Boolean(),
    genres: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ArtistOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    name: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    bio: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    profileImage: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    country: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Artist = typebox_1.Type.Composite([exports.ArtistPlain, exports.ArtistRelations]);
exports.ArtistInputCreate = typebox_1.Type.Composite([
    exports.ArtistPlainInputCreate,
    exports.ArtistRelationsInputCreate,
]);
exports.ArtistInputUpdate = typebox_1.Type.Composite([
    exports.ArtistPlainInputUpdate,
    exports.ArtistRelationsInputUpdate,
]);
