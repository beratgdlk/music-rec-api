import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RatingPlain = Type.Object({
  id: Type.Integer(),
  score: Type.Integer(),
  createdAt: Type.Date(),
  userId: Type.Integer(),
  songId: __nullable__(Type.Integer()),
  albumId: __nullable__(Type.Integer()),
});

export const RatingRelations = Type.Object({
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
  song: __nullable__(
    Type.Object({
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
  ),
  album: __nullable__(
    Type.Object({
      id: Type.Integer(),
      title: Type.String(),
      coverImage: __nullable__(Type.String()),
      releaseYear: Type.Integer(),
      type: Type.Union([
        Type.Literal("ALBUM"),
        Type.Literal("SINGLE"),
        Type.Literal("EP"),
      ]),
      rating: Type.Number(),
      createdAt: Type.Date(),
      updatedAt: Type.Date(),
      artistId: Type.Integer(),
    }),
  ),
});

export const RatingPlainInputCreate = Type.Object({ score: Type.Integer() });

export const RatingPlainInputUpdate = Type.Object({
  score: Type.Optional(Type.Integer()),
});

export const RatingRelationsInputCreate = Type.Object({
  user: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  song: Type.Optional(
    Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  ),
  album: Type.Optional(
    Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  ),
});

export const RatingRelationsInputUpdate = Type.Partial(
  Type.Object({
    user: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    song: Type.Partial(
      Type.Object({
        connect: Type.Object({
          id: Type.Integer(),
        }),
        disconnect: Type.Boolean(),
      }),
    ),
    album: Type.Partial(
      Type.Object({
        connect: Type.Object({
          id: Type.Integer(),
        }),
        disconnect: Type.Boolean(),
      }),
    ),
  }),
);

export const RatingWhere = Type.Partial(
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
          score: Type.Integer(),
          createdAt: Type.Date(),
          userId: Type.Integer(),
          songId: Type.Integer(),
          albumId: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "Rating" },
  ),
);

export const RatingWhereUnique = Type.Recursive(
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
              userId_albumId: Type.Object(
                { userId: Type.Integer(), albumId: Type.Integer() },
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
            Type.Object({
              userId_albumId: Type.Object(
                { userId: Type.Integer(), albumId: Type.Integer() },
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
            score: Type.Integer(),
            createdAt: Type.Date(),
            userId: Type.Integer(),
            songId: Type.Integer(),
            albumId: Type.Integer(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Rating" },
);

export const RatingSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    score: Type.Boolean(),
    createdAt: Type.Boolean(),
    user: Type.Boolean(),
    userId: Type.Boolean(),
    song: Type.Boolean(),
    songId: Type.Boolean(),
    album: Type.Boolean(),
    albumId: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const RatingInclude = Type.Partial(
  Type.Object({
    user: Type.Boolean(),
    song: Type.Boolean(),
    album: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const RatingOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    score: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    songId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    albumId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Rating = Type.Composite([RatingPlain, RatingRelations]);

export const RatingInputCreate = Type.Composite([
  RatingPlainInputCreate,
  RatingRelationsInputCreate,
]);

export const RatingInputUpdate = Type.Composite([
  RatingPlainInputUpdate,
  RatingRelationsInputUpdate,
]);
