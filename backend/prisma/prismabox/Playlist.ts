import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PlaylistPlain = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  description: __nullable__(Type.String()),
  coverImage: __nullable__(Type.String()),
  isPublic: Type.Boolean(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  ownerId: Type.Integer(),
});

export const PlaylistRelations = Type.Object({
  owner: Type.Object({
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
  songs: Type.Array(
    Type.Object({
      id: Type.Integer(),
      playlistId: Type.Integer(),
      songId: Type.Integer(),
      addedAt: Type.Date(),
      order: Type.Integer(),
    }),
    { additionalProperties: true },
  ),
});

export const PlaylistPlainInputCreate = Type.Object({
  name: Type.String(),
  description: Type.Optional(__nullable__(Type.String())),
  coverImage: Type.Optional(__nullable__(Type.String())),
  isPublic: Type.Optional(Type.Boolean()),
});

export const PlaylistPlainInputUpdate = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(__nullable__(Type.String())),
  coverImage: Type.Optional(__nullable__(Type.String())),
  isPublic: Type.Optional(Type.Boolean()),
});

export const PlaylistRelationsInputCreate = Type.Object({
  owner: Type.Object({
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
});

export const PlaylistRelationsInputUpdate = Type.Partial(
  Type.Object({
    owner: Type.Object({
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
  }),
);

export const PlaylistWhere = Type.Partial(
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
          description: Type.String(),
          coverImage: Type.String(),
          isPublic: Type.Boolean(),
          createdAt: Type.Date(),
          updatedAt: Type.Date(),
          ownerId: Type.Integer(),
        },
        { additionalProperties: true },
      ),
    { $id: "Playlist" },
  ),
);

export const PlaylistWhereUnique = Type.Recursive(
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
            description: Type.String(),
            coverImage: Type.String(),
            isPublic: Type.Boolean(),
            createdAt: Type.Date(),
            updatedAt: Type.Date(),
            ownerId: Type.Integer(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "Playlist" },
);

export const PlaylistSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    name: Type.Boolean(),
    description: Type.Boolean(),
    coverImage: Type.Boolean(),
    isPublic: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    owner: Type.Boolean(),
    ownerId: Type.Boolean(),
    songs: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const PlaylistInclude = Type.Partial(
  Type.Object({
    owner: Type.Boolean(),
    songs: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const PlaylistOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    name: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    description: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    coverImage: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    isPublic: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    ownerId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Playlist = Type.Composite([PlaylistPlain, PlaylistRelations]);

export const PlaylistInputCreate = Type.Composite([
  PlaylistPlainInputCreate,
  PlaylistRelationsInputCreate,
]);

export const PlaylistInputUpdate = Type.Composite([
  PlaylistPlainInputUpdate,
  PlaylistRelationsInputUpdate,
]);
