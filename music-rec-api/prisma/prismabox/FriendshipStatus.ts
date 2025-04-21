import { Type } from "@sinclair/typebox";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const FriendshipStatus = Type.Union([
  Type.Literal("PENDING"),
  Type.Literal("ACCEPTED"),
  Type.Literal("BLOCKED"),
]);
