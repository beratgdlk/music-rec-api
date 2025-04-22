import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const GenrePlain = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
});

export const GenreRelations = Type.Object({
  artists: Type.Array(
    Type.Object({
      id: Type.Integer(),
      artistId: Type.Integer(),
      genreId: Type.Integer(),
    }),
    { additionalProperties: true },
  ),
  albums: Type.Array(
    Type.Object({
      id: Type.Integer(),
      albumId: Type.Integer(),
      genreId: Type.Integer(),
    }),
    { additionalProperties: true },
  ),
});

export const GenrePlainInputCreate = Type.Object({ name: Type.String() });

export const GenrePlainInputUpdate = Type.Object({
  name: Type.Optional(Type.String()),
});

export const GenreRelationsInputCreate = Type.Object({
  artists: Type.Optional(
    Type.Object({
      connect: Type.Array(
        Type.Object({
          id: Type.Integer(),
        }),
        { additionalProperties: true },
      ),
    }),
  ),
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
});

export const GenreRelationsInputUpdate = Type.Partial(
  Type.Object({
    artists: Type.Partial(
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
  }),
);

export const GenreWhere = Type.Partial(
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
        },
        { additionalProperties: true },
      ),
    { $id: "Genre" },
  ),
);

export const GenreWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            { id: Type.Integer(), name: Type.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer() }),
            Type.Object({ name: Type.String() }),
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
        Type.Partial(Type.Object({ id: Type.Integer(), name: Type.String() })),
      ],
      { additionalProperties: true },
    ),
  { $id: "Genre" },
);

export const GenreSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    name: Type.Boolean(),
    artists: Type.Boolean(),
    albums: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const GenreInclude = Type.Partial(
  Type.Object({
    artists: Type.Boolean(),
    albums: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const GenreOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    name: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const Genre = Type.Composite([GenrePlain, GenreRelations]);

export const GenreInputCreate = Type.Composite([
  GenrePlainInputCreate,
  GenreRelationsInputCreate,
]);

export const GenreInputUpdate = Type.Composite([
  GenrePlainInputUpdate,
  GenreRelationsInputUpdate,
]);
