import { TObject } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { RequestHandler } from "express";
export function typeBoxValidator(schema: TObject): RequestHandler {
  const compiledSchema = TypeCompiler.Compile(schema);
  return (req, res, next) => {
    const body = req.body;
    const result = [...compiledSchema.Errors(body)];
    if (!!result.length) {
      return res.status(422).json({ error: result });
    }
    next();
  };
}
