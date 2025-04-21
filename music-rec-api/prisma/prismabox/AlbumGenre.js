"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumGenreInputUpdate = exports.AlbumGenreInputCreate = exports.AlbumGenre = exports.AlbumGenreOrderBy = exports.AlbumGenreInclude = exports.AlbumGenreSelect = exports.AlbumGenreWhereUnique = exports.AlbumGenreWhere = exports.AlbumGenreRelationsInputUpdate = exports.AlbumGenreRelationsInputCreate = exports.AlbumGenrePlainInputUpdate = exports.AlbumGenrePlainInputCreate = exports.AlbumGenreRelations = exports.AlbumGenrePlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.AlbumGenrePlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    albumId: typebox_1.Type.Integer(),
    genreId: typebox_1.Type.Integer(),
});
exports.AlbumGenreRelations = typebox_1.Type.Object({
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
    genre: typebox_1.Type.Object({ id: typebox_1.Type.Integer(), name: typebox_1.Type.String() }),
});
exports.AlbumGenrePlainInputCreate = typebox_1.Type.Object({});
exports.AlbumGenrePlainInputUpdate = typebox_1.Type.Object({});
exports.AlbumGenreRelationsInputCreate = typebox_1.Type.Object({
    album: typebox_1.Type.Object({
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
exports.AlbumGenreRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    album: typebox_1.Type.Object({
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
exports.AlbumGenreWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    albumId: typebox_1.Type.Integer(),
    genreId: typebox_1.Type.Integer(),
}, { additionalProperties: true }), { $id: "AlbumGenre" }));
exports.AlbumGenreWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        albumId_genreId: typebox_1.Type.Object({ albumId: typebox_1.Type.Integer(), genreId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            albumId_genreId: typebox_1.Type.Object({ albumId: typebox_1.Type.Integer(), genreId: typebox_1.Type.Integer() }, { additionalProperties: true }),
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
        albumId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
    })),
], { additionalProperties: true }), { $id: "AlbumGenre" });
exports.AlbumGenreSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    album: typebox_1.Type.Boolean(),
    albumId: typebox_1.Type.Boolean(),
    genre: typebox_1.Type.Boolean(),
    genreId: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.AlbumGenreInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    album: typebox_1.Type.Boolean(),
    genre: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.AlbumGenreOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    albumId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    genreId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.AlbumGenre = typebox_1.Type.Composite([
    exports.AlbumGenrePlain,
    exports.AlbumGenreRelations,
]);
exports.AlbumGenreInputCreate = typebox_1.Type.Composite([
    exports.AlbumGenrePlainInputCreate,
    exports.AlbumGenreRelationsInputCreate,
]);
exports.AlbumGenreInputUpdate = typebox_1.Type.Composite([
    exports.AlbumGenrePlainInputUpdate,
    exports.AlbumGenreRelationsInputUpdate,
]);
