import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SongPlaylistPlain = Type.Object({
  id: Type.Integer(),
  playlistId: Type.Integer(),
  songId: Type.Integer(),
  addedAt: Type.Date(),
  order: Type.Integer(),
});

export const SongPlaylistRelations = Type.Object({
  playlist: Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    description: __nullable__(Type.String()),
    coverImage: __nullable__(Type.String()),
    isPublic: Type.Boolean(),
    createdAt: Type.Date(),
    updatedAt: Type.Date(),
    ownerId: Type.Integer(),
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

export const SongPlaylistPlainInputCreate = Type.Object({
  addedAt: Type.Optional(Type.Date()),
  order: Type.Integer(),
});

export const SongPlaylistPlainInputUpdate = Type.Object({
  addedAt: Type.Optional(Type.Date()),
  order: Type.Optional(Type.Integer()),
});

export const SongPlaylistRelationsInputCreate = Type.Object({
  playlist: Type.Object({
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

export const SongPlaylistRelationsInputUpdate = Type.Partial(
  Type.Object({
    playlist: Type.Object({
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

export const SongPlaylistWhere = Type.Partial(
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
          playlistId: Type.Integer(),
          songId: Type.Integer(),
          addedAt: Type.Date(),
          order: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "SongPlaylist" },
  ),
);

export const SongPlaylistWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer(),
              playlistId_songId: Type.Object(
                { playlistId: Type.Integer(), songId: Type.Integer() },
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
              playlistId_songId: Type.Object(
                { playlistId: Type.Integer(), songId: Type.Integer() },
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
            playlistId: Type.Integer(),
            songId: Type.Integer(),
            addedAt: Type.Date(),
            order: Type.Integer(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "SongPlaylist" },
);

export const SongPlaylistSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    playlist: Type.Boolean(),
    playlistId: Type.Boolean(),
    song: Type.Boolean(),
    songId: Type.Boolean(),
    addedAt: Type.Boolean(),
    order: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const SongPlaylistInclude = Type.Partial(
  Type.Object({
    playlist: Type.Boolean(),
    song: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const SongPlaylistOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    playlistId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    songId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    addedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    order: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const SongPlaylist = Type.Composite([
  SongPlaylistPlain,
  SongPlaylistRelations,
]);

export const SongPlaylistInputCreate = Type.Composite([
  SongPlaylistPlainInputCreate,
  SongPlaylistRelationsInputCreate,
]);

export const SongPlaylistInputUpdate = Type.Composite([
  SongPlaylistPlainInputUpdate,
  SongPlaylistRelationsInputUpdate,
]);
