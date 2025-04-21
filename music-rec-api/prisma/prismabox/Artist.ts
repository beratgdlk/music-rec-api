import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ArtistPlain = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  bio: __nullable__(Type.String()),
  profileImage: __nullable__(Type.String()),
  country: __nullable__(Type.String()),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

export const ArtistRelations = Type.Object({
  albums: Type.Array(
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
    { additionalProperties: true },
  ),
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
      artistId: Type.Integer(),
      genreId: Type.Integer(),
    }),
    { additionalProperties: true },
  ),
});

export const ArtistPlainInputCreate = Type.Object({
  name: Type.String(),
  bio: Type.Optional(__nullable__(Type.String())),
  profileImage: Type.Optional(__nullable__(Type.String())),
  country: Type.Optional(__nullable__(Type.String())),
});

export const ArtistPlainInputUpdate = Type.Object({
  name: Type.Optional(Type.String()),
  bio: Type.Optional(__nullable__(Type.String())),
  profileImage: Type.Optional(__nullable__(Type.String())),
  country: Type.Optional(__nullable__(Type.String())),
});

export const ArtistRelationsInputCreate = Type.Object({
  albums: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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
});

export const ArtistRelationsInputUpdate = Type.Partial(
  Type.Object({
    albums: Type.Partial(
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
  }),
);

export const ArtistWhere = Type.Partial(
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
          name: Type.String(),
          bio: Type.String(),
          profileImage: Type.String(),
          country: Type.String(),
          createdAt: Type.Date(),
          updatedAt: Type.Date(),
        },
        { additionalProperties: true },
      ),
    { $id: "Artist" },
  ),
);

export const ArtistWhereUnique = Type.Recursive(
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
            name: Type.String(),
            bio: Type.String(),
            profileImage: Type.String(),
            country: Type.String(),
            createdAt: Type.Date(),
            updatedAt: Type.Date(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Artist" },
);

export const ArtistSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    name: Type.Boolean(),
    bio: Type.Boolean(),
    profileImage: Type.Boolean(),
    country: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    albums: Type.Boolean(),
    songs: Type.Boolean(),
    genres: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const ArtistInclude = Type.Partial(
  Type.Object({
    albums: Type.Boolean(),
    songs: Type.Boolean(),
    genres: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const ArtistOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    name: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    bio: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    profileImage: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    country: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
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

export const Artist = Type.Composite([ArtistPlain, ArtistRelations]);

export const ArtistInputCreate = Type.Composite([
  ArtistPlainInputCreate,
  ArtistRelationsInputCreate,
]);

export const ArtistInputUpdate = Type.Composite([
  ArtistPlainInputUpdate,
  ArtistRelationsInputUpdate,
]);
