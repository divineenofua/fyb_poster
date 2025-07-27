import { z } from "zod";

export const FormDataSchema = z.object({
  image: z.string().min(1, "field is required"),
  name: z.string().min(1, "First name is required"),
  alias: z.string().min(1, "nick name is required"),
  dob: z.string().min(1, "date of birth  is required"),
  handle: z.string(),
  rs: z.string().min(1, "field is required"),
  quote: z.string().min(1, "field is required"),
  level: z.string().min(1, "field is required"),
  course: z.string().min(1, "field is required"),
  lecturer: z.string().min(1, "field is required"),
  alternateCourse: z.string().min(1, "field is required"),
  missMost: z.string().min(1, "field is required"),
  clique: z.string().min(1, "field is required"),
});

export const FormSchema = z.object({
  details:FormDataSchema,
});
export type FormData =z.infer<typeof FormSchema>
export type FormDataReturn = z.infer<typeof FormDataSchema>;