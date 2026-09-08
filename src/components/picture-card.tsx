import { clsx } from "cn";
import { useState } from "react";

type PictureCardProps = {
  showNextPicture: boolean;
};

export function PictureCard({ showNextPicture }: PictureCardProps) {
  const [hasShown, setHasShown] = useState(false);
  if (showNextPicture && !hasShown) setHasShown(true);

  const picBaseStyles = "h-80 sm:h-132 bg-center bg-size-[auto_103%] rounded-xl border shadow-lg";

  return (
    <div className="w-full max-w-132 h-full relative">
      <div className={clsx(picBaseStyles, "bg-[url(/pic-1.png)]")} />
      <div
        className={clsx(
          picBaseStyles,
          "absolute inset-0 bg-cover bg-[url(/pic-2.png)]",
          // I came back to refactor cascading render issue with useEffect,
          // but i decided to even remove conditional rendering to let you see pic-2 immediately (without loading).
          // But if it were a real case and the component were compicated, I'd think to keep the cond. render.
          // cause user may left on booking process and pic-2 won't be useful in DOM
          showNextPicture ? "animate-spin-in" : hasShown ? "animate-spin-out" : "opacity-0"
        )}
      />
    </div>
  );
}
