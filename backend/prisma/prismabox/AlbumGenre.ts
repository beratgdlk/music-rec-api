import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AlbumGenrePlain = Type.Object({
  id: Type.Integer(),
  albumId: Type.Integer(),
  genreId: Type.Integer(),
});

export const AlbumGenreRelations = Type.Object({
  album: Type.Object({
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
  genre: Type.Object({ id: Type.Integer(), name: Type.String() }),
});

export const AlbumGenrePlainInputCreate = Type.Object({});

export const AlbumGenrePlainInputUpdate = Type.Object({});

export const AlbumGenreRelationsInputCreate = Type.Object({
  album: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  genre: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
});

export const AlbumGenreRelationsInputUpdate = Type.Partial(
  Type.Object({
    album: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    genre: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  }),
);

export const AlbumGenreWhere = Type.Partial(
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
          albumId: Type.Integer(),
          genreId: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "AlbumGenre" },
  ),
);

export const AlbumGenreWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              albumId_genreId: Type.Object(
                { albumId: Type.Integer(), genreId: Type.Integer() },
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
              albumId_genreId: Type.Object(
                { albumId: Type.Integer(), genreId: Type.Integer() },
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
            albumId: Type.Integer(),
            genreId: Type.Integer(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "AlbumGenre" },
);

export const AlbumGenreSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    album: Type.Boolean(),
    albumId: Type.Boolean(),
    genre: Type.Boolean(),
    genreId: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const AlbumGenreInclude = Type.Partial(
  Type.Object({
    album: Type.Boolean(),
    genre: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const AlbumGenreOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    albumId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    genreId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const AlbumGenre = Type.Composite([
  AlbumGenrePlain,
  AlbumGenreRelations,
]);

export const AlbumGenreInputCreate = Type.Composite([
  AlbumGenrePlainInputCreate,
  AlbumGenreRelationsInputCreate,
]);

export const AlbumGenreInputUpdate = Type.Composite([
  AlbumGenrePlainInputUpdate,
  AlbumGenreRelationsInputUpdate,
]);
