import { z } from "zod";

export const createPostvalidation = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  target_fund: z.string({
    required_error: "Invalid Fund.",
  }),
  benificiary_type: z.string({
    required_error: "Please select a benificiary.",
  }),
  postTitle: z.string({
    required_error: "Invalid Fund.",
  }),
  postDescription: z.string({
    required_error: "Invalid Fund.",
  }),
  document: z.any(),
});
