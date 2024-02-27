import { z } from "zod";

export const UpdateValidation = z.object({
    updates: z.string({
        required_error: "invalid text.",
      }), 
});