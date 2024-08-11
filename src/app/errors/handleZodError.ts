import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = err.issues
    .filter((issue: ZodIssue) => issue.code === "invalid_type")
    .map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
  const message = errorSources.map((source) => source.message).join(", ");

  const statusCode = 400;
  return {
    statusCode,
    message: message || "Validation Error",
    errorSources,
  };
};

export default handleZodError;
