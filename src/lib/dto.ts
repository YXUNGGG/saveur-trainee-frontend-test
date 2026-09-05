import z from "zod";

export const BookSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters length" }),
  phone: z.string().length(10, { message: "Phone must be valid and contain 10 digits" }),
  date: z.coerce.date(),
  time: z.string().nonempty({ message: "Time must be picked" }),
  guestsCount: z.coerce
    .number({ message: "Number of guests must be specified" })
    .max(12, { message: "Number of guests must be less than 13" })
    .positive({ message: "Number of guests must be positive" })
});

export type BookFormType = {
  name: string;
  phone: string;
  date: Date;
  time: string;
  guestsCount: number;
};

export type BookSuccessType = { success?: true };
export type BookStateType = (Partial<Record<keyof BookFormType, string>> & BookSuccessType) | undefined;
