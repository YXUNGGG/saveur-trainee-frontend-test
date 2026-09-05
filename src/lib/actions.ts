"use server";

import z from "zod";
import { BookStateType, BookSchema } from "./dto";

export async function bookTable(_: BookStateType, formData: FormData) {
  await new Promise(res => setTimeout(res, 1500));

  const result = BookSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    time: formData.get("time"),
    guestsCount: formData.get("guestsCount")
  });

  if (!result.success) {
    const bookStateErrors = z.flattenError(result.error).fieldErrors;
    return bookStateErrors as BookStateType;
  } else {
    return { success: true } as BookStateType;
  }
}
