"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreInputUpdate = exports.GenreInputCreate = exports.Genre = exports.GenreOrderBy = exports.GenreInclude = exports.GenreSelect = exports.GenreWhereUnique = exports.GenreWhere = exports.GenreRelationsInputUpdate = exports.GenreRelationsInputCreate = exports.GenrePlainInputUpdate = exports.GenrePlainInputCreate = exports.GenreRelations = exports.GenrePlain = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.GenrePlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    name: typebox_1.Type.String(),
});
exports.GenreRelations = typebox_1.Type.Object({
    artists: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        artistId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
    albums: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        albumId: typebox_1.Type.Integer(),
        genreId: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
});
exports.GenrePlainInputCreate = typebox_1.Type.Object({ name: typebox_1.Type.String() });
exports.GenrePlainInputUpdate = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.GenreRelationsInputCreate = typebox_1.Type.Object({
    artists: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    albums: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
});
exports.GenreRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    artists: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    albums: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
}));
exports.GenreWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
}, { additionalProperties: true }), { $id: "Genre" }));
exports.GenreWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({ id: typebox_1.Type.Integer(), name: typebox_1.Type.String() }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({ name: typebox_1.Type.String() }),
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
    typebox_1.Type.Partial(typebox_1.Type.Object({ id: typebox_1.Type.Integer(), name: typebox_1.Type.String() })),
], { additionalProperties: true }), { $id: "Genre" });
exports.GenreSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    name: typebox_1.Type.Boolean(),
    artists: typebox_1.Type.Boolean(),
    albums: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.GenreInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    artists: typebox_1.Type.Boolean(),
    albums: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.GenreOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    name: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Genre = typebox_1.Type.Composite([exports.GenrePlain, exports.GenreRelations]);
exports.GenreInputCreate = typebox_1.Type.Composite([
    exports.GenrePlainInputCreate,
    exports.GenreRelationsInputCreate,
]);
exports.GenreInputUpdate = typebox_1.Type.Composite([
    exports.GenrePlainInputUpdate,
    exports.GenreRelationsInputUpdate,
]);
