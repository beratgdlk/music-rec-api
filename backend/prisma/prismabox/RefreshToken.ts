import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RefreshTokenPlain = Type.Object({
  id: Type.Integer(),
  token: Type.String(),
  userId: Type.Integer(),
  expiresAt: Type.Date(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  revoked: Type.Boolean(),
});

export const RefreshTokenRelations = Type.Object({
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
});

export const RefreshTokenPlainInputCreate = Type.Object({
  token: Type.String(),
  expiresAt: Type.Date(),
  revoked: Type.Optional(Type.Boolean()),
});

export const RefreshTokenPlainInputUpdate = Type.Object({
  token: Type.Optional(Type.String()),
  expiresAt: Type.Optional(Type.Date()),
  revoked: Type.Optional(Type.Boolean()),
});

export const RefreshTokenRelationsInputCreate = Type.Object({
  user: Type.Object({
    connect: Type.Object({
      id: Type.Integer(),
    }),
  }),
});

export const RefreshTokenRelationsInputUpdate = Type.Partial(
  Type.Object({
    user: Type.Object({
      connect: Type.Object({
        id: Type.Integer(),
      }),
    }),
  }),
);

export const RefreshTokenWhere = Type.Partial(
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
          token: Type.String(),
          userId: Type.Integer(),
          expiresAt: Type.Date(),
          createdAt: Type.Date(),
          updatedAt: Type.Date(),
          revoked: Type.Boolean(),
        },
        { additionalProperties: true },
      ),
    { $id: "RefreshToken" },
  ),
);

export const RefreshTokenWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            { id: Type.Integer(), token: Type.String() },
            { additionalProperties: true },
          ),
          { additionalProperties: true },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer() }),
            Type.Object({ token: Type.String() }),
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
            token: Type.String(),
            userId: Type.Integer(),
            expiresAt: Type.Date(),
            createdAt: Type.Date(),
            updatedAt: Type.Date(),
            revoked: Type.Boolean(),
          }),
        ),
      ],
      { additionalProperties: true },
    ),
  { $id: "RefreshToken" },
);

export const RefreshTokenSelect = Type.Partial(
  Type.Object({
    id: Type.Boolean(),
    token: Type.Boolean(),
    userId: Type.Boolean(),
    user: Type.Boolean(),
    expiresAt: Type.Boolean(),
    createdAt: Type.Boolean(),
    updatedAt: Type.Boolean(),
    revoked: Type.Boolean(),
    _count: Type.Boolean(),
  }),
);

export const RefreshTokenInclude = Type.Partial(
  Type.Object({ user: Type.Boolean(), _count: Type.Boolean() }),
);

export const RefreshTokenOrderBy = Type.Partial(
  Type.Object({
    id: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    token: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    userId: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    expiresAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    createdAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    updatedAt: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
    revoked: Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
      additionalProperties: true,
    }),
  }),
);

export const RefreshToken = Type.Composite([
  RefreshTokenPlain,
  RefreshTokenRelations,
]);

export const RefreshTokenInputCreate = Type.Composite([
  RefreshTokenPlainInputCreate,
  RefreshTokenRelationsInputCreate,
]);

export const RefreshTokenInputUpdate = Type.Composite([
  RefreshTokenPlainInputUpdate,
  RefreshTokenRelationsInputUpdate,
]);
