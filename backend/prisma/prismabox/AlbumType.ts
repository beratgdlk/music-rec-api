import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AlbumType = Type.Union([
  Type.Literal("ALBUM"),
  Type.Literal("SINGLE"),
  Type.Literal("EP"),
]);
