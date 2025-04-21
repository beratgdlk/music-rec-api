import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SongPlain = Type.Object({
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
});

export const SongRelations = Type.Object({
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
  artist: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    bio: __nullable__(Type.String()),
    profileImage: __nullable__(Type.String()),
    country: __nullable__(Type.String()),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
  }),
  likedBy: Type.Array(
    Type.Object({
      id: Type.Integer(),
      userId: Type.Integer(),
      songId: Type.Integer(),
      likedAt: Type.Date(),
    }),
    { additionalProperties: true },
  ),
  playlists: Type.Array(
    Type.Object({
      id: Type.Integer(),
      playlistId: Type.Integer(),
      songId: Type.Integer(),
      addedAt: Type.Date(),
      order: Type.Integer(),
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
  wishlist: Type.Array(
    Type.Object({
      id: Type.Integer(),
      userId: Type.Integer(),
      songId: Type.Integer(),
      addedAt: Type.Date(),
    }),
    { additionalProperties: true },
  ),
});

export const SongPlainInputCreate = Type.Object({
  title: Type.String(),
  duration: Type.Integer(),
  trackNumber: Type.Integer(),
  audioUrl: Type.String(),
  rating: Type.Optional(Type.Number()),
});

export const SongPlainInputUpdate = Type.Object({
  title: Type.Optional(Type.String()),
  duration: Type.Optional(Type.Integer()),
  trackNumber: Type.Optional(Type.Integer()),
  audioUrl: Type.Optional(Type.String()),
  rating: Type.Optional(Type.Number()),
});

export const SongRelationsInputCreate = Type.Object({
  album: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  artist: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
  likedBy: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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
});

export const SongRelationsInputUpdate = Type.Partial(
  Type.Object({
    album: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    artist: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
    likedBy: Type.Partial(
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
  }),
);

export const SongWhere = Type.Partial(
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
          duration: Type.Integer(),
          trackNumber: Type.Integer(),
          audioUrl: Type.String(),
          rating: Type.Number(),
          createdAt: Type.Date(),
          updatedAt: Type.Date(),
          albumId: Type.Integer(),
          artistId: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "Song" },
  ),
);

export const SongWhereUnique = Type.Recursive(
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
      ],
      { additionalProperties: true },
    ),
  { $id: "Song" },
);

export const SongSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    title: Type.Boolean(),
    duration: Type.Boolean(),
    trackNumber: Type.Boolean(),
    audioUrl: Type.Boolean(),
    rating: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    album: Type.Boolean(),
    albumId: Type.Boolean(),
    artist: Type.Boolean(),
    artistId: Type.Boolean(),
    likedBy: Type.Boolean(),
    playlists: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    wishlist: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const SongInclude = Type.Partial(
  Type.Object({
    album: Type.Boolean(),
    artist: Type.Boolean(),
    likedBy: Type.Boolean(),
    playlists: Type.Boolean(),
    reviews: Type.Boolean(),
    ratings: Type.Boolean(),
    wishlist: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const SongOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    title: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    duration: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    trackNumber: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    audioUrl: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
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
    albumId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    artistId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Song = Type.Composite([SongPlain, SongRelations]);

export const SongInputCreate = Type.Composite([
  SongPlainInputCreate,
  SongRelationsInputCreate,
]);

export const SongInputUpdate = Type.Composite([
  SongPlainInputUpdate,
  SongRelationsInputUpdate,
]);
