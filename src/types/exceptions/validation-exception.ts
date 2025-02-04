import { ZodIssue } from "zod";

export interface ValidationExceptionDto {
  error: string;
  validation: ZodIssue[];
}
