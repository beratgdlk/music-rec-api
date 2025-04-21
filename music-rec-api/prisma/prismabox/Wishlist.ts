import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const WishlistPlain = Type.Object({
  id: Type.Integer(),
  userId: Type.Integer(),
  songId: Type.Integer(),
  addedAt: Type.Date(),
});

export const WishlistRelations = Type.Object({
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
  song: Type.Object({
    id: Type.Integer(),
    title: Type.String(),
    duration: Type.Integer(),
    trackNumber: Type.Integer(),
    audioUrl: Type.String(),
    rating: Type.Number(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
    albumId: Type.Integer(),
    artistId: Type.Integer(),
  }),
});

export const WishlistPlainInputCreate = Type.Object({
  addedAt: Type.Optional(Type.Date()),
});

export const WishlistPlainInputUpdate = Type.Object({
  addedAt: Type.Optional(Type.Date()),
});

export const WishlistRelationsInputCreate = Type.Object({
  user: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  song: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
});

export const WishlistRelationsInputUpdate = Type.Partial(
  Type.Object({
    user: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    song: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  }),
);

export const WishlistWhere = Type.Partial(
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
          songId: Type.Integer(),
          addedAt: Type.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Wishlist" },
  ),
);

export const WishlistWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              userId_songId: Type.Object(
                { userId: Type.Integer(), songId: Type.Integer() },
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
              userId_songId: Type.Object(
                { userId: Type.Integer(), songId: Type.Integer() },
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
            songId: Type.Integer(),
            addedAt: Type.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Wishlist" },
);

export const WishlistSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    user: Type.Boolean(),
    userId: Type.Boolean(),
    song: Type.Boolean(),
    songId: Type.Boolean(),
    addedAt: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const WishlistInclude = Type.Partial(
  Type.Object({
    user: Type.Boolean(),
    song: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const WishlistOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    songId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    addedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Wishlist = Type.Composite([WishlistPlain, WishlistRelations]);

export const WishlistInputCreate = Type.Composite([
  WishlistPlainInputCreate,
  WishlistRelationsInputCreate,
]);

export const WishlistInputUpdate = Type.Composite([
  WishlistPlainInputUpdate,
  WishlistRelationsInputUpdate,
]);
