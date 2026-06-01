import { z } from 'zod';
export const wizardSchema = z.object({
  aadhaarNumber: z
    .string()
    .trim()
    .length(12, { message: "Aadhaar must be exactly 12 digits long." })
    .regex(/^\d+$/, { message: "Aadhaar must only contain numbers." }),
  selectedBank: z
    .string()
    .min(1, { message: "Please select a bank from the list." }),
  lastTransaction: z
    .string()
    .min(1, { message: "Please select your last transaction timeline." }),
  accountType: z
    .string()
    .min(1, { message: "Please select your account type." })
});