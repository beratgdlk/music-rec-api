import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = Type.Object({
  id: Type.Integer(),
  email: Type.String(),
  username: Type.String(),
  password: Type.String(),
  name: __nullable__(Type.String()),
  profileImage: __nullable__(Type.String()),
  isAdmin: Type.Boolean(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

export const UserRelations = Type.Object({
  playlists: Type.Array(
    Type.Object({
      id: Type.Integer(),
      name: Type.String(),
      description: __nullable__(Type.String()),
      coverImage: __nullable__(Type.String()),
      isPublic: Type.Boolean(),
      createdAt: Type.Date(),
      updatedAt: Type.Date(),
      ownerId: Type.Integer(),
    }),
    { additionalProperties: true },
  ),
  likedSongs: Type.Array(
    Type.Object({
      id: Type.Integer(),
      userId: Type.Integer(),
      songId: Type.Integer(),
      likedAt: Type.Date(),
    }),
    { additionalProperties: true },
  ),
  reviews: Type.Array(
    Type.Object({
      id: Type.Integer(),
      content: Type.String(),
      createdAt: Type.Date(),
      updatedAt: Type.Date(),
      userId: Type.Integer(),
      songId: __nullable__(Type.Integer()),
      albumId: __nullable__(Type.Integer()),
    }),
    { additionalProperties: true },
  ),
  ratings: Type.Array(
    Type.Object({
      id: Type.Integer(),
      score: Type.Integer(),
      createdAt: Type.Date(),
      userId: Type.Integer(),
      songId: __nullable__(Type.Integer()),
      albumId: __nullable__(Type.Integer()),
    }),
    { additionalProperties: true },
  ),
  friends: Type.Array(
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
    { additionalProperties: true },
  ),
  friendsOf: Type.Array(
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
    { additionalProperties: true },
  ),
  wishlist: Type.Array(
    Type.Object({
      id: Type.Integer(),
      userId: Type.Integer(),
      songId: Type.Integer(),
      addedAt: Type.Date(),
    }),
    { additionalProperties: true },
  ),
  refreshTokens: Type.Array(
    Type.Object({
      id: Type.Integer(),
      token: Type.String(),
      userId: Type.Integer(),
      expiresAt: Type.Date(),
      createdAt: Type.Date(),
      updatedAt: Type.Date(),
      revoked: Type.Boolean(),
    }),
    { additionalProperties: true },
  ),
});

export const UserPlainInputCreate = Type.Object({
  email: Type.String(),
  username: Type.String(),
  password: Type.String(),
  name: Type.Optional(__nullable__(Type.String())),
  profileImage: Type.Optional(__nullable__(Type.String())),
  isAdmin: Type.Optional(Type.Boolean()),
});

export const UserPlainInputUpdate = Type.Object({
  email: Type.Optional(Type.String()),
  username: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
  name: Type.Optional(__nullable__(Type.String())),
  profileImage: Type.Optional(__nullable__(Type.String())),
  isAdmin: Type.Optional(Type.Boolean()),
});

export const UserRelationsInputCreate = Type.Object({
  playlists: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  likedSongs: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  reviews: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  ratings: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  friends: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  friendsOf: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  wishlist: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  refreshTokens: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
});

export const UserRelationsInputUpdate = Type.Partial(
  Type.Object({
    playlists: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    likedSongs: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    reviews: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    ratings: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    friends: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    friendsOf: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    wishlist: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
    refreshTokens: Type.Partial(
      Type.Object({
        connect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
        disconnect: Type.Array(
          Type.Object({
            id: Type.Integer(),
          }),
          { additionalProperties: true },
        ),
      }),
    ),
  }),
);

export const UserWhere = Type.Partial(
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
          email: Type.String(),
          username: Type.String(),
          password: Type.String(),
          name: Type.String(),
          profileImage: Type.String(),
          isAdmin: Type.Boolean(),
          createdAt: Type.Date(),
          updatedAt: Type.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              email: Type.String(),
              username: Type.String(),
            },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer() }),
            Type.Object({ email: Type.String() }),
            Type.Object({ username: Type.String() }),
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
            email: Type.String(),
            username: Type.String(),
            password: Type.String(),
            name: Type.String(),
            profileImage: Type.String(),
            isAdmin: Type.Boolean(),
            createdAt: Type.Date(),
            updatedAt: Type.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "User" },
);

export const UserSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    email: Type.Boolean(),
    username: Type.Boolean(),
    password: Type.Boolean(),
    name: Type.Boolean(),
    profileImage: Type.Boolean(),
    isAdmin: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    playlists: Type.Boolean(),
    likedSongs: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    friends: Type.Boolean(),
    friendsOf: Type.Boolean(),
    wishlist: Type.Boolean(),
    refreshTokens: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const UserInclude = Type.Partial(
  Type.Object({
    playlists: Type.Boolean(),
    likedSongs: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    friends: Type.Boolean(),
    friendsOf: Type.Boolean(),
    wishlist: Type.Boolean(),
    refreshTokens: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const UserOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    email: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    username: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    password: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    name: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    profileImage: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    isAdmin: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const User = Type.Composite([UserPlain, UserRelations]);

export const UserInputCreate = Type.Composite([
  UserPlainInputCreate,
  UserRelationsInputCreate,
]);

export const UserInputUpdate = Type.Composite([
  UserPlainInputUpdate,
  UserRelationsInputUpdate,
]);
