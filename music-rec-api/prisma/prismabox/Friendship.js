"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipInputUpdate = exports.FriendshipInputCreate = exports.Friendship = exports.FriendshipOrderBy = exports.FriendshipInclude = exports.FriendshipSelect = exports.FriendshipWhereUnique = exports.FriendshipWhere = exports.FriendshipRelationsInputUpdate = exports.FriendshipRelationsInputCreate = exports.FriendshipPlainInputUpdate = exports.FriendshipPlainInputCreate = exports.FriendshipRelations = exports.FriendshipPlain = void 0;
const typebox_1 = require("@sinclair/typebox");
const __nullable__1 = require("./__nullable__");
exports.FriendshipPlain = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    userId: typebox_1.Type.Integer(),
    friendId: typebox_1.Type.Integer(),
    status: typebox_1.Type.Union([
        typebox_1.Type.Literal("PENDING"),
        typebox_1.Type.Literal("ACCEPTED"),
        typebox_1.Type.Literal("BLOCKED"),
    ]),
    createdAt: typebox_1.Type.Date(),
});
exports.FriendshipRelations = typebox_1.Type.Object({
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
    friend: typebox_1.Type.Object({
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
});
exports.FriendshipPlainInputCreate = typebox_1.Type.Object({
    status: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("PENDING"),
        typebox_1.Type.Literal("ACCEPTED"),
        typebox_1.Type.Literal("BLOCKED"),
    ])),
});
exports.FriendshipPlainInputUpdate = typebox_1.Type.Object({
    status: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Literal("PENDING"),
        typebox_1.Type.Literal("ACCEPTED"),
        typebox_1.Type.Literal("BLOCKED"),
    ])),
});
exports.FriendshipRelationsInputCreate = typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    friend: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
});
exports.FriendshipRelationsInputUpdate = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
    friend: typebox_1.Type.Object({
        connect: typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
        }),
    }),
}));
exports.FriendshipWhere = typebox_1.Type.Partial(typebox_1.Type.Recursive((Self) => typebox_1.Type.Object({
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
    userId: typebox_1.Type.Integer(),
    friendId: typebox_1.Type.Integer(),
    status: typebox_1.Type.Union([
        typebox_1.Type.Literal("PENDING"),
        typebox_1.Type.Literal("ACCEPTED"),
        typebox_1.Type.Literal("BLOCKED"),
    ]),
    createdAt: typebox_1.Type.Date(),
}, { additionalProperties: true }), { $id: "Friendship" }));
exports.FriendshipWhereUnique = typebox_1.Type.Recursive((Self) => typebox_1.Type.Intersect([
    typebox_1.Type.Partial(typebox_1.Type.Object({
        id: typebox_1.Type.Integer(),
        userId_friendId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), friendId: typebox_1.Type.Integer() }, { additionalProperties: true }),
    }, { additionalProperties: true }), { additionalProperties: true }),
    typebox_1.Type.Union([
        typebox_1.Type.Object({ id: typebox_1.Type.Integer() }),
        typebox_1.Type.Object({
            userId_friendId: typebox_1.Type.Object({ userId: typebox_1.Type.Integer(), friendId: typebox_1.Type.Integer() }, { additionalProperties: true }),
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
        userId: typebox_1.Type.Integer(),
        friendId: typebox_1.Type.Integer(),
        status: typebox_1.Type.Union([
            typebox_1.Type.Literal("PENDING"),
            typebox_1.Type.Literal("ACCEPTED"),
            typebox_1.Type.Literal("BLOCKED"),
        ]),
        createdAt: typebox_1.Type.Date(),
    })),
], { additionalProperties: true }), { $id: "Friendship" });
exports.FriendshipSelect = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Boolean(),
    user: typebox_1.Type.Boolean(),
    userId: typebox_1.Type.Boolean(),
    friend: typebox_1.Type.Boolean(),
    friendId: typebox_1.Type.Boolean(),
    status: typebox_1.Type.Boolean(),
    createdAt: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.FriendshipInclude = typebox_1.Type.Partial(typebox_1.Type.Object({
    user: typebox_1.Type.Boolean(),
    friend: typebox_1.Type.Boolean(),
    status: typebox_1.Type.Boolean(),
    _count: typebox_1.Type.Boolean(),
}));
exports.FriendshipOrderBy = typebox_1.Type.Partial(typebox_1.Type.Object({
    id: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    userId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    friendId: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
    createdAt: typebox_1.Type.Union([typebox_1.Type.Literal("asc"), typebox_1.Type.Literal("desc")], {
        additionalProperties: true,
    }),
}));
exports.Friendship = typebox_1.Type.Composite([
    exports.FriendshipPlain,
    exports.FriendshipRelations,
]);
exports.FriendshipInputCreate = typebox_1.Type.Composite([
    exports.FriendshipPlainInputCreate,
    exports.FriendshipRelationsInputCreate,
]);
exports.FriendshipInputUpdate = typebox_1.Type.Composite([
    exports.FriendshipPlainInputUpdate,
    exports.FriendshipRelationsInputUpdate,
]);
