import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AlbumPlain = Type.Object({
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
});

export const AlbumRelations = Type.Object({
  artist: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    bio: __nullable__(Type.String()),
    profileImage: __nullable__(Type.String()),
    country: __nullable__(Type.String()),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
  }),
  songs: Type.Array(
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
    { additionalProperties: true },
  ),
  genres: Type.Array(
    Type.Object({
      id: Type.Integer(),
      albumId: Type.Integer(),
      genreId: Type.Integer(),
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
});

export const AlbumPlainInputCreate = Type.Object({
  title: Type.String(),
  coverImage: Type.Optional(__nullable__(Type.String())),
  releaseYear: Type.Integer(),
  type: Type.Optional(
    Type.Union([
      Type.Literal("ALBUM"),
      Type.Literal("SINGLE"),
      Type.Literal("EP"),
    ]),
  ),
  rating: Type.Optional(Type.Number()),
});

export const AlbumPlainInputUpdate = Type.Object({
  title: Type.Optional(Type.String()),
  coverImage: Type.Optional(__nullable__(Type.String())),
  releaseYear: Type.Optional(Type.Integer()),
  type: Type.Optional(
    Type.Union([
      Type.Literal("ALBUM"),
      Type.Literal("SINGLE"),
      Type.Literal("EP"),
    ]),
  ),
  rating: Type.Optional(Type.Number()),
});

export const AlbumRelationsInputCreate = Type.Object({
  artist: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  songs: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
  genres: Type.Optional(
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
});

export const AlbumRelationsInputUpdate = Type.Partial(
  Type.Object({
    artist: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    songs: Type.Partial(
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
    genres: Type.Partial(
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
  }),
);

export const AlbumWhere = Type.Partial(
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
          title: Type.String(),
          coverImage: Type.String(),
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
        },
        { additionalProperties: true },
      ),
    { $id: "Album" },
  ),
);

export const AlbumWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object({ id: Type.Integer() }, { additionalProperties: true }),
          { additionalProperties: true },
        ),
        Type.Union([Type.Object({ id: Type.Integer() })], {
          additionalProperties: true,
        }),
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
            title: Type.String(),
            coverImage: Type.String(),
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
      ],
      { additionalProperties: true },
    ),
  { $id: "Album" },
);

export const AlbumSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    title: Type.Boolean(),
    coverImage: Type.Boolean(),
    releaseYear: Type.Boolean(),
    type: Type.Boolean(),
    rating: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    artist: Type.Boolean(),
    artistId: Type.Boolean(),
    songs: Type.Boolean(),
    genres: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const AlbumInclude = Type.Partial(
  Type.Object({
    type: Type.Boolean(),
    artist: Type.Boolean(),
    songs: Type.Boolean(),
    genres: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const AlbumOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    title: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    coverImage: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    releaseYear: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    rating: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    artistId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Album = Type.Composite([AlbumPlain, AlbumRelations]);

export const AlbumInputCreate = Type.Composite([
  AlbumPlainInputCreate,
  AlbumRelationsInputCreate,
]);

export const AlbumInputUpdate = Type.Composite([
  AlbumPlainInputUpdate,
  AlbumRelationsInputUpdate,
]);
