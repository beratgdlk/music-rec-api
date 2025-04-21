import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ArtistGenrePlain = Type.Object({
  id: Type.Integer(),
  artistId: Type.Integer(),
  genreId: Type.Integer(),
});

export const ArtistGenreRelations = Type.Object({
  artist: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    bio: __nullable__(Type.String()),
    profileImage: __nullable__(Type.String()),
    country: __nullable__(Type.String()),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
  }),
  genre: Type.Object({ id: Type.Integer(), name: Type.String() }),
});

export const ArtistGenrePlainInputCreate = Type.Object({});

export const ArtistGenrePlainInputUpdate = Type.Object({});

export const ArtistGenreRelationsInputCreate = Type.Object({
  artist: Type.Object({
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

export const ArtistGenreRelationsInputUpdate = Type.Partial(
  Type.Object({
    artist: Type.Object({
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

export const ArtistGenreWhere = Type.Partial(
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
          artistId: Type.Integer(),
          genreId: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "ArtistGenre" },
  ),
);

export const ArtistGenreWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              artistId_genreId: Type.Object(
                { artistId: Type.Integer(), genreId: Type.Integer() },
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
              artistId_genreId: Type.Object(
                { artistId: Type.Integer(), genreId: Type.Integer() },
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
            artistId: Type.Integer(),
            genreId: Type.Integer(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "ArtistGenre" },
);

export const ArtistGenreSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    artist: Type.Boolean(),
    artistId: Type.Boolean(),
    genre: Type.Boolean(),
    genreId: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const ArtistGenreInclude = Type.Partial(
  Type.Object({
    artist: Type.Boolean(),
    genre: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const ArtistGenreOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    artistId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    genreId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const ArtistGenre = Type.Composite([
  ArtistGenrePlain,
  ArtistGenreRelations,
]);

export const ArtistGenreInputCreate = Type.Composite([
  ArtistGenrePlainInputCreate,
  ArtistGenreRelationsInputCreate,
]);

export const ArtistGenreInputUpdate = Type.Composite([
  ArtistGenrePlainInputUpdate,
  ArtistGenreRelationsInputUpdate,
]);
