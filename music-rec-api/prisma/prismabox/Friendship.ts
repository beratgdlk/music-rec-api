import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const FriendshipPlain = Type.Object({
  id: Type.Integer(),
  userId: Type.Integer(),
  friendId: Type.Integer(),
  status: Type.Union([
    Type.Literal("PENDING"),
    Type.Literal("ACCEPTED"),
    Type.Literal("BLOCKED"),
  ]),
  createdAt: Type.Date(),
});

export const FriendshipRelations = Type.Object({
  user: Type.Object({
    id: Type.Integer(),
    email: Type.String(),
    username: Type.String(),
    password: Type.String(),
    name: __nullable__(Type.String()),
    profileImage: __nullable__(Type.String()),
    isAdmin: Type.Boolean(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
  }),
  friend: Type.Object({
    id: Type.Integer(),
    email: Type.String(),
    username: Type.String(),
    password: Type.String(),
    name: __nullable__(Type.String()),
    profileImage: __nullable__(Type.String()),
    isAdmin: Type.Boolean(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
  }),
});

export const FriendshipPlainInputCreate = Type.Object({
  status: Type.Optional(
    Type.Union([
      Type.Literal("PENDING"),
      Type.Literal("ACCEPTED"),
      Type.Literal("BLOCKED"),
    ]),
  ),
});

export const FriendshipPlainInputUpdate = Type.Object({
  status: Type.Optional(
    Type.Union([
      Type.Literal("PENDING"),
      Type.Literal("ACCEPTED"),
      Type.Literal("BLOCKED"),
    ]),
  ),
});

export const FriendshipRelationsInputCreate = Type.Object({
  user: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  friend: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
});

export const FriendshipRelationsInputUpdate = Type.Partial(
  Type.Object({
    user: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    friend: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  }),
);

export const FriendshipWhere = Type.Partial(
  Type.Recursive(
    (Self) =>
      Type.Object(
        {
          AND: Type.Union([
            Self,
            Type.Array(Self, { additionalProperties: true }),
          ]),
          NOT: Type.Union([
            Self,
            Type.Array(Self, { additionalProperties: true }),
          ]),
          OR: Type.Array(Self, { additionalProperties: true }),
          id: Type.Integer(),
          userId: Type.Integer(),
          friendId: Type.Integer(),
          status: Type.Union([
            Type.Literal("PENDING"),
            Type.Literal("ACCEPTED"),
            Type.Literal("BLOCKED"),
          ]),
          createdAt: Type.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Friendship" },
  ),
);

export const FriendshipWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              userId_friendId: Type.Object(
                { userId: Type.Integer(), friendId: Type.Integer() },
                { additionalProperties: true },
              ),
            },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer() }),
            Type.Object({
              userId_friendId: Type.Object(
                { userId: Type.Integer(), friendId: Type.Integer() },
                { additionalProperties: true },
              ),
            }),
          ],
          { additionalProperties: true },
        ),
        Type.Partial(
          Type.Object({
            AND: Type.Union([
              Self,
              Type.Array(Self, { additionalProperties: true }),
            ]),
            NOT: Type.Union([
              Self,
              Type.Array(Self, { additionalProperties: true }),
            ]),
            OR: Type.Array(Self, { additionalProperties: true }),
          }),
          { additionalProperties: true },
        ),
        Type.Partial(
          Type.Object({
            id: Type.Integer(),
            userId: Type.Integer(),
            friendId: Type.Integer(),
            status: Type.Union([
              Type.Literal("PENDING"),
              Type.Literal("ACCEPTED"),
              Type.Literal("BLOCKED"),
            ]),
            createdAt: Type.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Friendship" },
);

export const FriendshipSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    user: Type.Boolean(),
    userId: Type.Boolean(),
    friend: Type.Boolean(),
    friendId: Type.Boolean(),
    status: Type.Boolean(),
    createdAt: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const FriendshipInclude = Type.Partial(
  Type.Object({
    user: Type.Boolean(),
    friend: Type.Boolean(),
    status: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const FriendshipOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    friendId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Friendship = Type.Composite([
  FriendshipPlain,
  FriendshipRelations,
]);

export const FriendshipInputCreate = Type.Composite([
  FriendshipPlainInputCreate,
  FriendshipRelationsInputCreate,
]);

export const FriendshipInputUpdate = Type.Composite([
  FriendshipPlainInputUpdate,
  FriendshipRelationsInputUpdate,
]);
