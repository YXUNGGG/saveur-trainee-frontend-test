"use client";

import { BookFormCard } from "@/components/book-form-card";
import { BookInfoCard } from "@/components/book-info-card";
import { PictureCard } from "@/components/picture-card";
import { BookFormType } from "@/lib/dto";
import { useState } from "react";

export default function Page() {
  const [bookData, setIsBookData] = useState<BookFormType | null>(null);
  const isBooked = bookData !== null;

  return (
    <div className="flex min-h-svh p-2 sm:p-6 lg:justify-center flex-col lg:flex-row items-center gap-x-6 gap-y-3">
      <PictureCard showNextPicture={isBooked} />
      {isBooked ? (
        <BookInfoCard
          className="animate-fade-in w-full sm:w-132"
          bookData={bookData!}
          onSubmit={() => setIsBookData(null)}
        />
      ) : (
        <BookFormCard className="animate-fade-in w-full sm:w-132" onBook={setIsBookData} />
      )}
    </div>
  );
}
