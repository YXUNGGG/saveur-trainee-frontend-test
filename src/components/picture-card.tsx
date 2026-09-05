import { clsx } from "cn";
import { useEffect, useState } from "react";

type PictureCardProps = {
  showNextPicture: boolean;
};

export function PictureCard({ showNextPicture }: PictureCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  const picBaseStyles = "h-80 sm:h-132 bg-center bg-size-[auto_103%] rounded-xl border shadow-lg";

  useEffect(() => {
    if (showNextPicture) setIsMounted(true);
  }, [showNextPicture]);

  return (
    <div className="w-full max-w-132 h-full relative">
      <div className={clsx(picBaseStyles, "bg-[url(/pic-1.png)]")} />
      {isMounted && (
        <div
          onAnimationEnd={() => {
            if (!showNextPicture) setIsMounted(false);
          }}
          className={clsx(
            picBaseStyles,
            showNextPicture ? "animate-spin-in" : "animate-spin-out",
            "absolute inset-0 bg-cover bg-[url(/pic-2.png)]"
          )}
        />
      )}
    </div>
  );
}
