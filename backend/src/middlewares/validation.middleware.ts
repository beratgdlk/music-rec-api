import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";
import type { ValidationChain } from "express-validator";
import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/error.utils";

/**
 * Validation hatasını işleyecek middleware
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Tüm validasyon zincirlerini çalıştır
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Hataları topla
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    // Hata varsa, ilk hatayı göster
    const errorMessages = errors.array().map((err) => err.msg);
    throw new BadRequestError(errorMessages[0]);
  };
};
