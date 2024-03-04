import { z } from "zod";

export const Donationvalidation = z.object({
    Donation_amount: z.string({
        required_error: "Invalid Fund.",
      }),
      // Tips_amount:z.string({
      //   required_error: "Invalid Fund.",
      // }),
      paymentMethod: z.string({
        required_error: "Choose one of the Payent Method.",
      })
});
