"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistGenreInputUpdate = exports.ArtistGenreInputCreate = exports.ArtistGenre = exports.ArtistGenreOrderBy = exports.ArtistGenreInclude = exports.ArtistGenreSelect = exports.ArtistGenreWhereUnique = exports.ArtistGenreWhere = exports.ArtistGenreRelationsInputUpdate = exports.ArtistGenreRelationsInputCreate = exports.ArtistGenrePlainInputUpdate = exports.ArtistGenrePlainInputCreate = exports.ArtistGenreRelations = exports.ArtistGenrePlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.ArtistGenrePlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    artistId: typebox_1.Type.Integer(),
    genreId: typebox_1.Type.Integer(),
});
exports.ArtistGenreRelations = typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        name: typebox_1.Type.String(),
        bio: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        country: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    }),
    genre: typebox_1.Type.Object({ id: typebox_1.Type.Integer(), name: typebox_1.Type.String() }),
});
exports.ArtistGenrePlainInputCreate = typebox_1.Type.Object({});
exports.ArtistGenrePlainInputUpdate = typebox_1.Type.Object({});
exports.ArtistGenreRelationsInputCreate = typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    genre: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
});
exports.ArtistGenreRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    artist: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    genre: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
}));
exports.ArtistGenreWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    artistId: typebox_1.Type.Integer(),
    genreId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "ArtistGenre" }));
exports.ArtistGenreWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        artistId_genreId: typebox_1.Type.Object({ artistId: typebox_1.Type.Integer(), genreId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            artistId_genreId: typebox_1.Type.Object({ artistId: typebox_1.Type.Integer(), genreId: typebox_1.Type.Integer() }, { additionalProperties: true }),
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
        artistId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "ArtistGenre" });
exports.ArtistGenreSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    artist: typebox_1.Type.Boolean(),
    artistId: typebox_1.Type.Boolean(),
    genre: typebox_1.Type.Boolean(),
    genreId: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ArtistGenreInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    artist: typebox_1.Type.Boolean(),
    genre: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.ArtistGenreOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    artistId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    genreId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.ArtistGenre = typebox_1.Type.Composite([
    exports.ArtistGenrePlain,
    exports.ArtistGenreRelations,
]);
exports.ArtistGenreInputCreate = typebox_1.Type.Composite([
    exports.ArtistGenrePlainInputCreate,
    exports.ArtistGenreRelationsInputCreate,
]);
exports.ArtistGenreInputUpdate = typebox_1.Type.Composite([
    exports.ArtistGenrePlainInputUpdate,
    exports.ArtistGenreRelationsInputUpdate,
]);
