

import { z } from "zod";

export const UpdatePostvalidation = z.object({
  userId:z.number(),
  postId:z.number(),
  postTitle: z.string({
    required_error: "Invalid Title.",
  }),
  postDescription: z.string({
    required_error: "Invalid Description.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  post_type: z.string({
    required_error: "Select the Type for the Campaign",
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
  document: z.any().optional(),
  Image: z.any().optional(),
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
