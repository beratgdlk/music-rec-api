"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputUpdate = exports.UserInputCreate = exports.User = exports.UserOrderBy = exports.UserInclude = exports.UserSelect = exports.UserWhereUnique = exports.UserWhere = exports.UserRelationsInputUpdate = exports.UserRelationsInputCreate = exports.UserPlainInputUpdate = exports.UserPlainInputCreate = exports.UserRelations = exports.UserPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.UserPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    email: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    name: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    profileImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
    isAdmin: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
});
exports.UserRelations = typebox_1.Type.Object({
    playlists: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        name: typebox_1.Type.String(),
        description: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        coverImage: (0, __nullable__1.__nullable__)(typebox_1.Type.String()),
        isPublic: typebox_1.Type.Boolean(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        ownerId: typebox_1.Type.Integer(),
    }), { additionalProperties: true }),
    likedSongs: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        likedAt: typebox_1.Type.Date(),
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
    friends: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        friendId: typebox_1.Type.Integer(),
        status: typebox_1.Type.Union([
            typebox_1.Type.Literal("PENDING"),
            typebox_1.Type.Literal("ACCEPTED"),
            typebox_1.Type.Literal("BLOCKED"),
        ]),
        createdAt: typebox_1.Type.Date(),
    }), { additionalProperties: true }),
    friendsOf: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        friendId: typebox_1.Type.Integer(),
        status: typebox_1.Type.Union([
            typebox_1.Type.Literal("PENDING"),
            typebox_1.Type.Literal("ACCEPTED"),
            typebox_1.Type.Literal("BLOCKED"),
        ]),
        createdAt: typebox_1.Type.Date(),
    }), { additionalProperties: true }),
    wishlist: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId: typebox_1.Type.Integer(),
        songId: typebox_1.Type.Integer(),
        addedAt: typebox_1.Type.Date(),
    }), { additionalProperties: true }),
    refreshTokens: typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        token: typebox_1.Type.String(),
        userId: typebox_1.Type.Integer(),
        expiresAt: typebox_1.Type.Date(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
        revoked: typebox_1.Type.Boolean(),
    }), { additionalProperties: true }),
});
exports.UserPlainInputCreate = typebox_1.Type.Object({
    email: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    name: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    profileImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    isAdmin: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.UserPlainInputUpdate = typebox_1.Type.Object({
    email: typebox_1.Type.Optional(typebox_1.Type.String()),
    username: typebox_1.Type.Optional(typebox_1.Type.String()),
    password: typebox_1.Type.Optional(typebox_1.Type.String()),
    name: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    profileImage: typebox_1.Type.Optional((0, __nullable__1.__nullable__)(typebox_1.Type.String())),
    isAdmin: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.UserRelationsInputCreate = typebox_1.Type.Object({
    playlists: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    likedSongs: typebox_1.Type.Optional(typebox_1.Type.Object({
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
    friends: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    friendsOf: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    wishlist: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    refreshTokens: typebox_1.Type.Optional(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
});
exports.UserRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    playlists: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    likedSongs: typebox_1.Type.Partial(typebox_1.Type.Object({
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
    friends: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
    friendsOf: typebox_1.Type.Partial(typebox_1.Type.Object({
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
    refreshTokens: typebox_1.Type.Partial(typebox_1.Type.Object({
        connect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
        disconnect: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }), { additionalProperties: true }),
    })),
}));
exports.UserWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    email: typebox_1.Type.String(),
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    profileImage: typebox_1.Type.String(),
    isAdmin: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Date(),
    updatedAt: typebox_1.Type.Date(),
}, { additionalProperties: true }), { $id: "User" }));
exports.UserWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        email: typebox_1.Type.String(),
        username: typebox_1.Type.String(),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({ email: typebox_1.Type.String() }),
        typebox_1.Type.Object({ username: typebox_1.Type.String() }),
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
        email: typebox_1.Type.String(),
        username: typebox_1.Type.String(),
        password: typebox_1.Type.String(),
        name: typebox_1.Type.String(),
        profileImage: typebox_1.Type.String(),
        isAdmin: typebox_1.Type.Boolean(),
        createdAt: typebox_1.Type.Date(),
        updatedAt: typebox_1.Type.Date(),
    })),
], { additionalProperties: true }), { $id: "User" });
exports.UserSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    email: typebox_1.Type.Boolean(),
    username: typebox_1.Type.Boolean(),
    password: typebox_1.Type.Boolean(),
    name: typebox_1.Type.Boolean(),
    profileImage: typebox_1.Type.Boolean(),
    isAdmin: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    updatedAt: typebox_1.Type.Boolean(),
    playlists: typebox_1.Type.Boolean(),
    likedSongs: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    friends: typebox_1.Type.Boolean(),
    friendsOf: typebox_1.Type.Boolean(),
    wishlist: typebox_1.Type.Boolean(),
    refreshTokens: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.UserInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    playlists: typebox_1.Type.Boolean(),
    likedSongs: typebox_1.Type.Boolean(),
    reviews: typebox_1.Type.Boolean(),
    ratings: typebox_1.Type.Boolean(),
    friends: typebox_1.Type.Boolean(),
    friendsOf: typebox_1.Type.Boolean(),
    wishlist: typebox_1.Type.Boolean(),
    refreshTokens: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.UserOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    email: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    username: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    password: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    name: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    profileImage: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    isAdmin: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    updatedAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.User = typebox_1.Type.Composite([exports.UserPlain, exports.UserRelations]);
exports.UserInputCreate = typebox_1.Type.Composite([
    exports.UserPlainInputCreate,
    exports.UserRelationsInputCreate,
]);
exports.UserInputUpdate = typebox_1.Type.Composite([
    exports.UserPlainInputUpdate,
    exports.UserRelationsInputUpdate,
]);
