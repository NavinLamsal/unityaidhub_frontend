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
  post_type: z.string({
    required_error: "Select the Type for the Campaign",
  }),
  benificiary_type: z.string({
    required_error: "Please select a benificiary.",
  }),
  postTitle: z.string({
    required_error: "Invalid Title.",
  }),
  postDescription: z.string({
    required_error: "Invalid Description.",
  }),
  // document: z.any().optional(),
  terms:z.string({
    required_error: "You must comply with our terms and services.",
  }),
  benificiaryEmail: z.string({
    required_error:"Invalid email"
  })
   .email({ message: "Invalid email format" }).optional(),
  benificiaryNGO: z.string({
    required_error: "NGO must be selected"
  }).optional(),
}).refine((data) => {
  if (data.benificiary_type === "someone") {
    return data.benificiaryEmail !== undefined;
  } else if (data.benificiary_type === "NGO") {
    return data.benificiaryNGO !== undefined;
  }
  return true;
});
